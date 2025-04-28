export function successResponse(data: any, message?: string) {
  return {
    success: true,
    message,
    data,
  };
}
