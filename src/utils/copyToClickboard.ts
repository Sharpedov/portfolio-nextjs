import React, { useCallback, useEffect, useState } from "react";

export const CopyToClipboard = () => {
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [timeoutCopied, setTimeoutCopied] = useState(null);

	const copyHandler = useCallback((copyContent: string) => {
		navigator.clipboard.writeText(copyContent);

		setIsCopied(true);

		let timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		setTimeoutCopied(timeout);
	}, []);

	useEffect(() => {
		return () => clearTimeout(timeoutCopied);
	}, [timeoutCopied]);

	return { isCopied, copyHandler };
};
