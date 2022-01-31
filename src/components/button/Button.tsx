import classNames from 'classnames'
import styles from './Button.module.css'

interface ButtonProps {
	form?: string
	onClick?: () => void
	variant?: 'default' | 'inline-right' | 'inline-left'
	type?: 'submit' | 'reset' | 'button'
}

const Button: React.FC<ButtonProps> = ({
	children,
	form,
	onClick,
	variant = 'default',
	type = 'button',
}) => {
	return (
		<button
			className={classNames([styles.button, styles[variant]])}
			form={form}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
