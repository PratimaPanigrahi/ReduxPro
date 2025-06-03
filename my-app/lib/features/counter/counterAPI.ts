// A mock function to mimic making an async request for data
export async function POST(request: Request) {
  // ...your code...
}export const incrementCounter = async (amount: number): Promise<{ data: number }> => {
  if (typeof amount !== "number") {
    throw new Error("Amount must be a number");
  }
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: amount });
    }, 1000);
  });
}
// Add this export if it does not exist
export async function fetchCount(amount: number): Promise<{ data: number }> {
  // Simulate an API call
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}