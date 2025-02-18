import {
	ExtendedHeaders,
	Message,
	SubscribeHeaders,
	UnsubscribeHeaders,
} from "webstomp-client";

export const useSocket = () => {
	const { $socket, $sendUriPrefix, $subscribeUriPrefix } = useNuxtApp();
	return {
		$socket: {
			send: <T>(
				destination: string,
				body: T extends null | undefined ? never : T,
				headers?: ExtendedHeaders,
			) =>
				$socket.send(
					`${$sendUriPrefix}/${urlUtils.removeLeadingSlash(destination)}`,
					typeof body !== "string" ? JSON.stringify(body) : body,
					headers,
				),
			subscribe: (
				destination: string,
				callback?: ((message: Message) => any) | undefined,
				header?: SubscribeHeaders,
			) =>
				$socket.subscribe(
					`${$subscribeUriPrefix}/${urlUtils.removeLeadingSlash(destination)}`,
					callback,
					header,
				),
			unsubscribe: (id: string, header?: UnsubscribeHeaders) =>
				$socket.unsubscribe(id, header),
			begin: (transaction: string) => $socket.begin(transaction),
			abort: (transaction: string) => $socket.abort(transaction),
			commit: (transaction: string) => $socket.commit(transaction),
			debug: (...args: any[]) => $socket.debug(args),
			isConnected: () => $socket.connected,
		},
	};
};
