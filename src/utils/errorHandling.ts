export function handleLoginError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('user not found')) {
      return 'No account found with this email';
    }
    if (message.includes('wrong password')) {
      return 'Incorrect password';
    }
    if (message.includes('too many requests')) {
      return 'Too many attempts. Please try again later';
    }
    if (message.includes('network')) {
      return 'Network error. Please check your connection';
    }
  }
  
  return 'An unexpected error occurred';
}

export function handleRegisterError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('email already in use')) {
      return 'An account with this email already exists';
    }
    if (message.includes('weak password')) {
      return 'Password is too weak. Please use a stronger password';
    }
    if (message.includes('invalid email')) {
      return 'Please enter a valid email address';
    }
    if (message.includes('network')) {
      return 'Network error. Please check your connection';
    }
  }
  
  return 'An unexpected error occurred';
}