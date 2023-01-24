import { useQuasar } from 'quasar'

type NotifyType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing'

const useNotify = () => {
	const $q = useQuasar()

	const message = (type: NotifyType, color?: string, textColor?: string) => {
		return (message: string) =>
			$q.notify({
				type,
				message,
				position: 'top',
				textColor: textColor ?? 'grey-2',
				color: color ?? type,
				timeout: 1000,
				progress: false,
			})
	}

	const positiveMessage = message('positive')
	const negativeMessage = message('negative')
	const warningMessage = message('warning')
	const infoMessage = message('info', 'info', 'grey-9')
	const ongoingMessage = message('ongoing')

	return {
		positiveMessage,
		negativeMessage,
		warningMessage,
		infoMessage,
		ongoingMessage,
	}
}

export default useNotify
