import { memo } from 'react';
import './Button.css';

interface ButtonProps {
    label: string;
    value: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = memo(({ label, value, onClick }) => {
    return (
        <button name={value} onClick={onClick} value={value}>{label}</button>
    );
});

export default Button;