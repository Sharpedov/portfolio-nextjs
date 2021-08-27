import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import CustomIconButton from "../customIconButton";
import { useIntl } from "react-intl";
import { motion, AnimatePresence } from "framer-motion";

interface pageProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};
const contentVariants = {
	hidden: { scale: 1.15, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: { delay: 0.1 },
	},
};

const ImageModal = ({ children, isOpen, onClose }: pageProps) => {
	const { formatMessage: f } = useIntl();
	const [isBrowser, setIsBrowser] = useState<boolean>(false);
	const backdropRef = useRef(null);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const closeHandler = useCallback(
		(e) => {
			if (e.target === backdropRef.current) onClose();
		},
		[onClose]
	);

	const escapeListener = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (backdropRef.current) {
			document.addEventListener("keydown", escapeListener);

			return () => document.removeEventListener("keydown", escapeListener);
		}
	}, [escapeListener]);

	return (
		isBrowser &&
		createPortal(
			<AnimatePresence>
				{isOpen && (
					<Backdrop
						onClick={closeHandler}
						ref={backdropRef}
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<Content variants={contentVariants}>
							{children}
							<Close>
								<CustomIconButton
									ariaLabel={f({ id: "modal.close" })}
									Icon={CloseIcon}
									onClick={onClose}
								/>
							</Close>
						</Content>
					</Backdrop>
				)}
			</AnimatePresence>,
			document.getElementById("modal")
		)
	);
};

export default ImageModal;

const Backdrop = styled(motion.div)`
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
	background: rgba(0, 0, 0, 0.82);
	z-index: 900;
`;

const Content = styled(motion.div)`
	position: relative;
	display: grid;
	place-items: center;
	height: 100%;
	background: ${({ theme }) => theme.colors.background1};
`;

const Close = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
`;
