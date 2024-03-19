import Link from 'next/link';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const theme = {
  primary: {
    background: '#21a4ff',
    color: '#fff',
    border: 'none'
  },
  secondary: {
    background: 'white',
    color: 'black',
    border: '1px solid black'
  },
  text: {
    background: 'white',
    color: 'black',
    border: 'none'
  }
};

const sharedStyles = css<ButtonProps>`
  display: inline-block;
  font-size: 0.8rem;
  padding: 16px 24px;
  border-radius: 100px;
  text-decoration: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  height: 46px;
  ${({ variant }) =>
    variant &&
    css`
      background: ${theme[variant].background};
      color: ${theme[variant].color};
      border: ${theme[variant].border};
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${sharedStyles};
`;

const StyledButton = styled.button<ButtonProps>`
  ${sharedStyles};
`;

const Button = ({ href, variant = 'primary', children, onClick, disabled }: ButtonProps) => {
  if (href) {
    return (
      <StyledLink href={href} variant={variant} onClick={onClick} disabled={disabled}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton variant={variant} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
