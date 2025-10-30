import Rating from "@/ui/components/Rating";
import { CURRENT_RATINGS, IRating } from "../utils/constants/ratings";

export default function FormLoginRight(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="right-header flex flex-col gap-2 justify-center items-center">
        <div className="h-12 w-12 bg-[var(--color-blue-light-2)] rounded-full flex justify-center items-center">
          <div className="h-8 w-8 bg-[var(--color-blue)] rounded-full"></div>
        </div>
        <h2 className="font-bold text-[1.6rem] w-70 text-center">
          Take control of your financial future
        </h2>
      </div>
      <div className="right-body flex flex-col gap-6">
        <p className="text-sm text-[var(--color-text-gray)] w-70">
          Join thousands of users who trust ai money to manage their finances
          smarter with AI-powered insights.
        </p>
        <div className="flex items-center justify-between">
          {CURRENT_RATINGS.map((rating: IRating, index: number) => (
            <Rating
              title={rating.title}
              description={rating.description}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
