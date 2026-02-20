export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends ComponentProps {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  required?: boolean;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface TableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface TransactionRowProps {
  id: string;
  type: string;
  amount: bigint;
  status: string;
  timestamp: number;
  onClick?: () => void;
}

export interface WalletButtonProps {
  connected: boolean;
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export interface FormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
  error?: string;
  children: React.ReactNode;
}

export interface NavItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: number;
}
