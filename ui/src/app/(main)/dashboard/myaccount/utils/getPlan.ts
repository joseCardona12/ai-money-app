export function getPlan(planId: number): string {
  switch (planId) {
    case 1:
      return "Free";
    case 2:
      return "Premium";
    case 3:
      return "Enterprise";
    default:
      return "Free";
  }
}
