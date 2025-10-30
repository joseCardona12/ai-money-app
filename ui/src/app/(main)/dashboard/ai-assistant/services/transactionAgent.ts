/**
 * Transaction Agent Service
 * Executes transaction-related actions based on NLP intent
 */

import { transactionService } from "@/services/transaction";
import { categoryService } from "@/services/category";
import { transactionTypeService } from "@/services/transactionType";
import { transactionStateService } from "@/services/transactionState";
import { accountService } from "@/services/account";
import { ICreateTransactionRequest } from "@/interfaces/transaction";
import { IExtractedIntent } from "./nlpService";

export interface IAgentResponse {
  success: boolean;
  message: string;
  data?: any;
  needsMoreInfo?: boolean;
  missingFields?: string[];
}

export interface ITransactionDefaults {
  categoryId: number;
  typeId: number;
  stateId: number;
  accountId: number;
}

export class TransactionAgent {
  private userId: number;
  private defaults: ITransactionDefaults | null = null;

  constructor(userId: number) {
    this.userId = userId;
  }

  /**
   * Initialize agent by fetching default IDs
   */
  public async initialize(): Promise<void> {
    try {
      // Fetch categories, types, states, and accounts to get default IDs
      // Note: accountService.getAllAccounts() uses JWT token, no userId needed
      const [categoriesRes, typesRes, statesRes, accountsRes] =
        await Promise.all([
          categoryService.getAllCategories(),
          transactionTypeService.getAllTransactionTypes(),
          transactionStateService.getAllTransactionStates(),
          accountService.getAllAccounts(), // Changed: uses JWT token from authMiddleware
        ]);

      // Get first available IDs as defaults
      const categories = categoriesRes.data || [];
      const types = typesRes.data || [];
      const states = statesRes.data || [];
      const accounts = accountsRes.data || [];

      this.defaults = {
        categoryId: categories[0]?.id || 1,
        typeId: types[0]?.id || 1,
        stateId: states[0]?.id || 1,
        accountId: accounts[0]?.id || 8, // Default to account ID 8
      };
    } catch (error) {
      console.error("Error initializing transaction agent:", error);
      // Set fallback defaults
      this.defaults = {
        categoryId: 1,
        typeId: 1,
        stateId: 1,
        accountId: 8, // Default to account ID 8
      };
    }
  }

  /**
   * Execute action based on intent
   */
  public async executeIntent(
    intent: IExtractedIntent
  ): Promise<IAgentResponse> {
    // Check if we have enough information
    if (!intent.action || !intent.resource) {
      return {
        success: false,
        message:
          "I couldn't understand your request. Please try again with more details.",
        needsMoreInfo: true,
      };
    }

    // Check confidence
    if (intent.confidence < 0.5) {
      return {
        success: false,
        message:
          "I'm not confident I understood correctly. Could you rephrase your request?",
        needsMoreInfo: true,
      };
    }

    // Route to appropriate handler
    switch (intent.action) {
      case "create":
      case "add":
        return await this.handleCreateTransaction(intent);

      case "get":
      case "show":
      case "list":
        return await this.handleGetTransactions(intent);

      case "update":
      case "edit":
        return {
          success: false,
          message:
            "Transaction updates are not yet supported through the AI assistant. Please use the transactions page.",
        };

      case "delete":
      case "remove":
        return {
          success: false,
          message:
            "Transaction deletion is not yet supported through the AI assistant. Please use the transactions page.",
        };

      default:
        return {
          success: false,
          message: "I don't know how to perform that action yet.",
        };
    }
  }

  /**
   * Handle create transaction
   */
  private async handleCreateTransaction(
    intent: IExtractedIntent
  ): Promise<IAgentResponse> {
    // Check if we need more information
    if (!intent.useDefaults && intent.missingFields.length > 0) {
      return {
        success: false,
        message: `I need more information to create the transaction. Missing: ${intent.missingFields.join(
          ", "
        )}. Please provide these details or say "create a default transaction" to use default values.`,
        needsMoreInfo: true,
        missingFields: intent.missingFields,
      };
    }

    // Ensure defaults are loaded
    if (!this.defaults) {
      await this.initialize();
    }

    try {
      // Build transaction request
      const transactionData = await this.buildTransactionRequest(intent);

      // Create transaction
      const response = await transactionService.createTransaction(
        transactionData,
        this.userId
      );

      if (response.status >= 400) {
        return {
          success: false,
          message: `Failed to create transaction: ${response.message}`,
        };
      }

      // Format success message
      const successMessage = this.formatSuccessMessage(transactionData, intent);

      return {
        success: true,
        message: successMessage,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Error creating transaction: ${
          error.message || "Unknown error"
        }`,
      };
    }
  }

  /**
   * Handle get transactions
   */
  private async handleGetTransactions(
    intent: IExtractedIntent
  ): Promise<IAgentResponse> {
    try {
      const response = await transactionService.getTransactionsByUserId(
        this.userId,
        1,
        5
      );

      if (response.status >= 400) {
        return {
          success: false,
          message: `Failed to fetch transactions: ${response.message}`,
        };
      }

      const transactions = response.data?.transactions || [];

      if (transactions.length === 0) {
        return {
          success: true,
          message:
            "You don't have any transactions yet. Would you like to create one?",
          data: [],
        };
      }

      // Format transaction list
      const transactionList = transactions
        .slice(0, 5)
        .map((t: any, index: number) => {
          return `${index + 1}. ${t.description || "No description"} - $${
            t.amount
          } (${t.category?.name || "Unknown"})`;
        })
        .join("\n");

      return {
        success: true,
        message: `Here are your recent transactions:\n\n${transactionList}\n\nWould you like to see more details?`,
        data: transactions,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Error fetching transactions: ${
          error.message || "Unknown error"
        }`,
      };
    }
  }

  /**
   * Build transaction request from intent
   */
  private async buildTransactionRequest(
    intent: IExtractedIntent
  ): Promise<ICreateTransactionRequest> {
    const { extractedValues, useDefaults } = intent;

    // If using defaults, return default transaction
    if (useDefaults) {
      return {
        description: "Default transaction created by AI",
        amount: 100.0,
        date: new Date(),
        transaction_type_id: this.defaults!.typeId,
        state_id: this.defaults!.stateId,
        account_id: this.defaults!.accountId,
        category_id: this.defaults!.categoryId,
      };
    }

    // Map category name to ID
    let categoryId = this.defaults!.categoryId;
    if (extractedValues.category) {
      const categoryIdFromName = await this.getCategoryIdByName(
        extractedValues.category
      );
      if (categoryIdFromName) {
        categoryId = categoryIdFromName;
      }
    }

    // Map type to ID
    let typeId = this.defaults!.typeId;
    if (extractedValues.type) {
      const typeIdFromName = await this.getTypeIdByName(extractedValues.type);
      if (typeIdFromName) {
        typeId = typeIdFromName;
      }
    }

    return {
      description: extractedValues.description || "Transaction created by AI",
      amount: extractedValues.amount || 0,
      date: extractedValues.date ? new Date(extractedValues.date) : new Date(),
      transaction_type_id: typeId,
      state_id: this.defaults!.stateId,
      account_id: this.defaults!.accountId,
      category_id: categoryId,
    };
  }

  /**
   * Get category ID by name
   */
  private async getCategoryIdByName(
    categoryName: string
  ): Promise<number | null> {
    try {
      const response = await categoryService.getAllCategories();
      const categories = response.data || [];
      const category = categories.find(
        (c: any) => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      return category?.id || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get type ID by name
   */
  private async getTypeIdByName(typeName: string): Promise<number | null> {
    try {
      const response = await transactionTypeService.getAllTransactionTypes();
      const types = response.data || [];
      const type = types.find(
        (t: any) => t.name.toLowerCase() === typeName.toLowerCase()
      );
      return type?.id || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Format success message
   */
  private formatSuccessMessage(
    transaction: ICreateTransactionRequest,
    intent: IExtractedIntent
  ): string {
    if (intent.useDefaults) {
      return `✅ Default transaction created successfully! Amount: $${transaction.amount}`;
    }

    const parts: string[] = ["✅ Transaction created successfully!"];
    parts.push(`Amount: $${transaction.amount}`);
    if (transaction.description)
      parts.push(`Description: ${transaction.description}`);

    return parts.join("\n");
  }
}
