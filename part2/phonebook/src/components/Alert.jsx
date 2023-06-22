
export default function Alert({ message, isError }){
	if (message === null) {
		return null
	}

	return (
		<div className={isError ? 'error' : 'alert'}>
			{message}
		</div>
	)
}