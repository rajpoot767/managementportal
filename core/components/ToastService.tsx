class ToastService {
    private static showToast: (message: string, messageType: string) => void;
    private static closeToast: () => void;
  
    public static initialize(showToast: (message: string, messageType: string) => void, closeToast: () => void) {
      ToastService.showToast = showToast;
      ToastService.closeToast = closeToast;
    }
  
    public static showError(message: string) {
      if (ToastService.showToast) {
        ToastService.showToast(message, "error");
      }
    }
  
    public static showInfo(message: string) {
      if (ToastService.showToast) {
        ToastService.showToast(message, "info");
      }
    }
  
    public static close() {
      if (ToastService.closeToast) {
        ToastService.closeToast();
      }
    }
  }
  
  export default ToastService;
  