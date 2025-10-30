/**
 * Natural Language Processing Service
 * Extracts keywords and intent from user messages
 */

export interface IExtractedIntent {
  action: "create" | "add" | "get" | "show" | "list" | "update" | "edit" | "delete" | "remove" | null;
  resource: "transaction" | "transactions" | null;
  useDefaults: boolean;
  extractedValues: {
    amount?: number;
    description?: string;
    category?: string;
    type?: "income" | "expense";
    date?: string;
  };
  missingFields: string[];
  confidence: number;
}

export class NLPService {
  // Action keywords mapping
  private static ACTION_KEYWORDS = {
    create: ["create", "add", "new", "make", "register"],
    get: ["get", "show", "display", "view", "see", "list", "find"],
    update: ["update", "edit", "modify", "change"],
    delete: ["delete", "remove", "erase", "cancel"],
  };

  // Resource keywords
  private static RESOURCE_KEYWORDS = {
    transaction: ["transaction", "transactions", "payment", "expense", "income", "charge"],
  };

  // Type keywords
  private static TYPE_KEYWORDS = {
    income: ["income", "earning", "salary", "revenue", "profit", "gain"],
    expense: ["expense", "spending", "cost", "payment", "charge", "bill"],
  };

  // Category keywords (common categories)
  private static CATEGORY_KEYWORDS = {
    food: ["food", "groceries", "grocery", "restaurant", "dining", "lunch", "dinner", "breakfast"],
    transport: ["transport", "transportation", "gas", "fuel", "uber", "taxi", "bus", "metro"],
    entertainment: ["entertainment", "movie", "cinema", "game", "fun", "hobby"],
    shopping: ["shopping", "clothes", "clothing", "shoes", "fashion"],
    utilities: ["utilities", "utility", "electricity", "water", "internet", "phone"],
    health: ["health", "medical", "doctor", "pharmacy", "medicine", "hospital"],
    education: ["education", "school", "course", "book", "tuition"],
    other: ["other", "miscellaneous", "misc", "various"],
  };

  /**
   * Extract intent from user message
   */
  public static extractIntent(message: string): IExtractedIntent {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);

    // Extract action
    const action = this.extractAction(words);

    // Extract resource
    const resource = this.extractResource(words);

    // Check if user wants default values
    const useDefaults = lowerMessage.includes("default") || lowerMessage.includes("test");

    // Extract values from message
    const extractedValues = this.extractValues(lowerMessage, words);

    // Determine missing fields (only for create/add actions)
    const missingFields = this.determineMissingFields(action, extractedValues, useDefaults);

    // Calculate confidence
    const confidence = this.calculateConfidence(action, resource, extractedValues);

    return {
      action,
      resource,
      useDefaults,
      extractedValues,
      missingFields,
      confidence,
    };
  }

  /**
   * Extract action from words
   */
  private static extractAction(words: string[]): IExtractedIntent["action"] {
    for (const word of words) {
      for (const [action, keywords] of Object.entries(this.ACTION_KEYWORDS)) {
        if (keywords.includes(word)) {
          return action as IExtractedIntent["action"];
        }
      }
    }
    return null;
  }

  /**
   * Extract resource from words
   */
  private static extractResource(words: string[]): IExtractedIntent["resource"] {
    for (const word of words) {
      for (const [resource, keywords] of Object.entries(this.RESOURCE_KEYWORDS)) {
        if (keywords.includes(word)) {
          return resource as IExtractedIntent["resource"];
        }
      }
    }
    return null;
  }

  /**
   * Extract values from message
   */
  private static extractValues(message: string, words: string[]): IExtractedIntent["extractedValues"] {
    const values: IExtractedIntent["extractedValues"] = {};

    // Extract amount (numbers)
    const amountMatch = message.match(/\$?(\d+(?:\.\d{1,2})?)/);
    if (amountMatch) {
      values.amount = parseFloat(amountMatch[1]);
    }

    // Extract type (income/expense)
    for (const word of words) {
      if (this.TYPE_KEYWORDS.income.includes(word)) {
        values.type = "income";
        break;
      }
      if (this.TYPE_KEYWORDS.expense.includes(word)) {
        values.type = "expense";
        break;
      }
    }

    // Extract category
    for (const [category, keywords] of Object.entries(this.CATEGORY_KEYWORDS)) {
      for (const word of words) {
        if (keywords.includes(word)) {
          values.category = category;
          break;
        }
      }
      if (values.category) break;
    }

    // Extract description (words after "for" or quoted text)
    const forMatch = message.match(/for\s+([a-zA-Z\s]+?)(?:\s+\d|$)/i);
    if (forMatch) {
      values.description = forMatch[1].trim();
    }

    const quotedMatch = message.match(/["']([^"']+)["']/);
    if (quotedMatch) {
      values.description = quotedMatch[1];
    }

    // Extract date (today, yesterday, specific date)
    if (message.includes("today")) {
      values.date = new Date().toISOString().split("T")[0];
    } else if (message.includes("yesterday")) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      values.date = yesterday.toISOString().split("T")[0];
    }

    return values;
  }

  /**
   * Determine missing required fields
   */
  private static determineMissingFields(
    action: IExtractedIntent["action"],
    extractedValues: IExtractedIntent["extractedValues"],
    useDefaults: boolean
  ): string[] {
    // Only check for create/add actions
    if (action !== "create" && action !== "add") {
      return [];
    }

    // If using defaults, no fields are missing
    if (useDefaults) {
      return [];
    }

    const missing: string[] = [];

    if (!extractedValues.amount) missing.push("amount");
    if (!extractedValues.type) missing.push("type (income/expense)");
    if (!extractedValues.category) missing.push("category");
    if (!extractedValues.description) missing.push("description");

    return missing;
  }

  /**
   * Calculate confidence score (0-1)
   */
  private static calculateConfidence(
    action: IExtractedIntent["action"],
    resource: IExtractedIntent["resource"],
    extractedValues: IExtractedIntent["extractedValues"]
  ): number {
    let confidence = 0;

    // Action found
    if (action) confidence += 0.3;

    // Resource found
    if (resource) confidence += 0.3;

    // Values found
    const valueCount = Object.keys(extractedValues).length;
    confidence += Math.min(valueCount * 0.1, 0.4);

    return Math.min(confidence, 1);
  }

  /**
   * Generate a human-readable summary of the intent
   */
  public static summarizeIntent(intent: IExtractedIntent): string {
    if (!intent.action || !intent.resource) {
      return "I'm not sure what you want me to do. Could you be more specific?";
    }

    const parts: string[] = [];
    parts.push(`I understand you want to ${intent.action} a ${intent.resource}.`);

    if (intent.useDefaults) {
      parts.push("I'll use default values for the transaction.");
    } else if (Object.keys(intent.extractedValues).length > 0) {
      const details: string[] = [];
      if (intent.extractedValues.amount) details.push(`Amount: $${intent.extractedValues.amount}`);
      if (intent.extractedValues.type) details.push(`Type: ${intent.extractedValues.type}`);
      if (intent.extractedValues.category) details.push(`Category: ${intent.extractedValues.category}`);
      if (intent.extractedValues.description) details.push(`Description: ${intent.extractedValues.description}`);
      
      if (details.length > 0) {
        parts.push("Here's what I found: " + details.join(", "));
      }
    }

    if (intent.missingFields.length > 0) {
      parts.push(`I need the following information: ${intent.missingFields.join(", ")}`);
    }

    return parts.join(" ");
  }
}

