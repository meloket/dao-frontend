import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Box, Modal } from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { FaMediumM } from 'react-icons/fa'
import { BsDiscord, BsTwitter, BsTelegram } from 'react-icons/bs';

import back_img1 from "../../assets/right_panel_reserve2.png";
import faith1 from '../../assets/faith1.png';
import Token from '../../connectors/Token.json'
import Web3 from 'web3'

export default function Claim({ flag_con_wallet, claim, set_claim }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// const [tribe, set_tribe] = useState(0);
	const [rate, set_rate] = useState(0);
	// const [reserve, set_reserve] = useState(0);
	const [flag_success, set_success] = useState(false);
	const [btn_flg, set_btn] = useState(false);
	const style1 = {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40%',
		boxShadow: 30,
	};

	const style2 = {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#2DAFB2',
		justifyContent: 'center',
		height: '451px',
		position: ' relative'

	};

	useEffect(() => {
		fetchData();
	})
	async function fetchData() {
		window.web3 = new Web3(window.web3.currentProvider);
		await window.ethereum.enable();
		let contract = new window.web3.eth.Contract(Token.abi, "0xcac6338567608fe59ab5dd8fcda97a1135e5a102")
		// let temp_tribe = await contract.methods.claimedTotal.call().call();
		// set_tribe(window.web3.utils.fromWei(temp_tribe, 'ether'));
		// let remain_reserve = await contract.methods.getHoldsTotal.call().call();
		// let r = window.web3.utils.fromWei(remain_reserve, "ether");
		// set_reserve(r);
		const faith_wei = await contract.methods.getPriceInWei().call();
		const temp = window.web3.utils.fromWei(faith_wei, "ether");
		const rate1 = temp;
		set_rate(rate1);

	}
	const trans_success = async () => {
		if (btn_flg === true) {
			alert("Can't click reserve button any more. Please wait until claiming.");
			return;
		}
		else {
			set_btn(true);
			window.web3 = new Web3(window.web3.currentProvider);
			await window.ethereum.enable();
			const accounts = await window.web3.eth.getAccounts();
			let contract = new window.web3.eth.Contract(Token.abi, "0xcac6338567608fe59ab5dd8fcda97a1135e5a102");
			console.log(claim)
			await contract.methods.claim(claim).send({ from: accounts[0] }).then(async (res) => {
				handleClose();
				set_success(true);
				set_claim(0);
				set_btn(false);

			});
		}

	}

	return (
		<Reservebody >
			<Boxletter display="flex" marginTop="15%" color="white" justifyContent="center" fontSize="72px" fontWeight="200" lineHeight="72px" >CLAIM</Boxletter>
			<Box textAlign="center" color="white" fontSize="16px" lineHeight="28px" marginTop="2%">
				Claim state and details go here. ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut<br />
				laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis <br />
				nisl ut aliquip ex ea commodo consequat.
			</Box>
			<Before flag_success={flag_success ? 1 : 0} alignItems="center" flexDirection="column" width="60%" height="400px" border="1px solid rgb(112 63 145)" marginTop="5%" bgcolor="rgba(42, 20, 72, 0.85)">
				<Boxletter1 display="flex" flex="1" justifyContent="center" alignItems="center">CLAIM YOUR FAITH</Boxletter1>
				<Box flex="2" textAlign="center" color="white" fontSize="16px" lineHeight="28px" fontWeight="normal">
					You are eligible for your TRIBE FAITH.<br />
					View your FAITH below, and start the claim process.<br />
					<br />
					You can receive up to...
				</Box>
				<Letter1 display="flex" flex="1" justifyContent="center" alignItems="flex-start" color="white" fontSize="48px" lineHeight="28px" fontWeight="300">{claim} FAITH TRIBE</Letter1>
				<Box display="flex" flex="1" justifyContent="center" alignItems="flex-start" width="100%">
					<Btnreserve1 display="flex" justifyContent="center" alignItems="center" onClick={() => { handleOpen() }}> START YOUR CLAIM PROCESS</Btnreserve1>
				</Box>

			</Before>

			<Success flag_success={flag_success ? 1 : 0} alignItems="center" flexDirection="column" width="60%" height="341px" border="1px solid rgb(112 63 145)" marginTop="5%" bgcolor="rgba(42, 20, 72, 0.85)">
				<Boxletter1 display="flex" flex="1" justifyContent="center" alignItems="center">CLAIM SUCCESSFUL!</Boxletter1>
				<Box flex="2" textAlign="center" color="white" fontSize="16px" lineHeight="28px" fontWeight="normal">
					Congratulations on claiming your FAITH TRIBE!
					<br />
					<br />

					We encourage you to share on Twitter and join the FAITH CONNECTION <br />
					TRIBE Discord to get involved in governance.
				</Box>
				<Box display="flex" flex="1" alignItems="flex-start" width="40%">
					<Box display="flex" flex="1" alignItems="center" justifyContent="center" >
						<Box display="flex" borderRadius="100%" bgcolor="white" width="34px" height="34px" alignItems="center" justifyContent="center">
							<BsDiscord fontSize="18px" color="rgb(42, 20, 72)"></BsDiscord>
						</Box>
					</Box>
					<Box display="flex" flex="1" alignItems="center" justifyContent="center" >
						<Box display="flex" borderRadius="100%" bgcolor="white" width="34px" height="34px" alignItems="center" justifyContent="center">
							<BsTelegram fontSize="18px" color="rgb(42, 20, 72)"></BsTelegram>
						</Box>
					</Box>
					<Box display="flex" flex="1" alignItems="center" justifyContent="center" >
						<Box display="flex" borderRadius="100%" bgcolor="white" width="34px" height="34px" alignItems="center" justifyContent="center">
							<BsTwitter fontSize="18px" color="rgb(42, 20, 72)"></BsTwitter>
						</Box>
					</Box>
					<Box display="flex" flex="1" alignItems="center" justifyContent="center" >
						<Box display="flex" borderRadius="100%" bgcolor="white" width="34px" height="34px" alignItems="center" justifyContent="center">
							<FaMediumM fontSize="18px" color="rgb(42, 20, 72)"></FaMediumM>
						</Box>
					</Box>

				</Box>

			</Success>

			<Modal
				open={open}
				// onClose={handleClose}  // disable backdrop
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				style={{
					backdropFilter: 'blur(10px)'
				}}
			>
				<ReserveC sx={style1}>
					<Box display="flex" justifyContent="center" marginBottom="2%" fontSize="72px" lineHeight="72px" fontWeight="200" sx={{
						'background': 'linear-gradient(150deg,  #E4CB6F 20%,#DB5994 50% ,#7735BD 60%)',
						'-webkit-background-clip': 'text',
						'-webkit-text-fill-color': 'transparent'
					}}>CLAIM</Box>
					<Box sx={style2}>
						<Box display="flex" flex="0.5" flexDirection="column" width="100%">
							<Box display="flex" fontSize='24px' fontWeight='bold' color='white' lineHeight='28px' marginTop="2%" justifyContent="flex-end" marginRight="2%"
								onClick={() => {
									handleClose();
									set_btn(false);
								}}><MdClose fontSize="24px" color="white"></MdClose>
							</Box>
							<Box display="flex" fontSize='24px' color='white' lineHeight='28px' justifyContent="center" marginTop="2%" >CLAIM FAITH TRIBE</Box>
						</Box>
						{/* <Box display="flex" flex="1" marginTop="3%" width="80%" border="1px solid white">
							<Box display="flex" flex="7" flexDirection="column" marginLeft="5%">
								<Box display="flex" flex='2' alignItems="center" fontSize="16px" color="white" lineHeight="19px" fontWeight="bold">
									<img src={eth1} width="42px"></img><Box marginLeft="5%">ETH</Box>
								</Box>
								<Box display="flex" flex='1' alignItems="flex-start">
									<Box display="flex" marginRight="5%" fontSize="14px" color="white" style={{ opacity: '0.6' }} lineHeight="18px">Balance:{'\u00a0'}{'\u00a0'}21.33{'\u00a0'}ETH</Box>
									<Box display="flex" fontSize="14px" color="white" lineHeight="18px" fontWeight="bold">( MAX )</Box>
								</Box>
							</Box>
							<Box display="flex" flex="3" justifyContent="flex-end" alignItems="center" >
								<Box display="flex" marginRight="20%" color="white" fontWeight="300" fontSize="32px" lineHeight="130%">
									0.0
								</Box>
							</Box>
						</Box> */}
						<Box display="flex" flex="1" marginTop="10%" width="80%" border="1px solid white" flexDirection="column">
							<Box display="flex" flex="2" marginLeft="5%">
								<Box display="flex" flex='7' alignItems="center" fontSize="16px" color="white" lineHeight="19px" fontWeight="bold">
									<img src={faith1} width="42px" alt=""></img><Box marginLeft="5%">FAITH TRIBE</Box>
								</Box>
								<Box display="flex" flex="3" justifyContent="flex-end" alignItems="center" >
									<Box display="flex" marginRight="20%" color="white" fontWeight="300" fontSize="32px" lineHeight="130%">
										{claim}
									</Box>
								</Box>
							</Box>
							<Box display="flex" flex='1' alignItems="flex-start" marginLeft="5%">
								<Box display="flex" marginRight="5%" fontSize="14px" color="white" style={{ opacity: '0.6' }} lineHeight="18px">Balance:{'\u00a0'}{'\u00a0'}{claim}{'\u00a0'}FAITH TRIBE</Box>
								<Box display="flex" fontSize="14px" color="white" lineHeight="18px" fontWeight="bold">( MAX )</Box>
							</Box>

						</Box>
						<Box display="flex" flex="1" width="100%" alignItems="center" justifyContent="center">
							{
								!flag_con_wallet ? <Box display="flex" width="40%" height="38px" bgcolor="white" style={{ opacity: '0.3' }} color="#2DAFB2" alignItems="center" justifyContent="center" fontSize="16px" lineHeight="19px">CLAIM</Box> :
									<Btnreserve display="flex" width="40%" height="38px" bgcolor="white" color="#2DAFB2" alignItems="center" justifyContent="center" fontSize="16px" lineHeight="19px" onClick={() => { trans_success(); }}>CLAIM</Btnreserve>
							}

						</Box>
						<LetterETH display="flex" flex="1" justifyContent="center" fontSize="32px" lineHeight="130%" fontWeight="300" color="white">
							1 FAITH = {parseFloat(rate).toFixed(10)} ETH
						</LetterETH>
						{/* <Box position="absolute" display="flex" justifyContent="center" alignItems="center" borderRadius="100%" width="29px" height="29px" bgcolor="white" top="35%">
							<BsArrowDown color="#06A9C0" fontSize="25px" fontWeight="bold"></BsArrowDown>
						</Box> */}
					</Box>
				</ReserveC>
			</Modal>

		</Reservebody >
	);
}

const LetterETH = styled(Box)`
	font-size: 32px;
	@media (max-width: 1000px) {
		font-size: 30px;
	}
	@media (max-width: 600px) {
		font-size: 24x;
	}
	@media (max-width: 450px) {
		font-size: 20px;
	}
`

const ReserveC = styled(Box)`
	width: 40%;
	@media (max-width: 1200px) {
		width: 60%;
	}
	@media (max-width: 800px) {
		width: 70%;
	}
	@media (max-width: 600px) {
		width: 85%;
	}

`

const Letter1 = styled(Box)`
	@media (max-width: 1000px) {
		font-size: 35px;
	}
		@media (max-width: 1000px) {
			font-size: 30px;
		}
		@media (max-width: 800px) {
			font-size: 25px;
		}
		@media (max-width: 700px) {
			font-size: 20px;

		}
`

const Before = styled(Box)`
	display: ${({ flag_success }) => flag_success ? 'none' : 'flex'};
	margin-bottom: 5%;
	@media (max-width: 1000px) {
		width: 80% !important;
	}
	@media (max-width: 800px) {
		width: 90% !important;
	}
	@media (max-width: 700px) {
		width: 90% !important;

	}
`

const Success = styled(Box)`
	display: ${({ flag_success }) => flag_success ? 'flex' : 'none'};
	@media (max-width: 1000px) {
		width: 70% !important;
	}
	@media (max-width: 800px) {
		width: 80% !important;
	}
	@media (max-width: 700px) {
		width: 90% !important;

	}
	margin-bottom: 5%;
`

const Btnreserve = styled(Box)`

	&:hover {
		cursor: pointer;
		box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
	}

	&:active {
		cursor: pointer;
		border-image: linear-gradient(#DB5994, #E4CB6F, #06A9C0) 1 1 1;
		background-color: grey;
	}
`

const Btnreserve1 = styled(Box)`

	width: 50%;
	height: 39px !important;
	background: black;
	border: 1px solid #06A9C0;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;
	color: #FFFFFF;
	cursor: pointer;
	&:hover {
		border-image: linear-gradient(#E4CB6F, #DB5994, #06A9C0) 1 1 1;
		background-color: black;
	}

	&:active {
		border-image: linear-gradient(#DB5994, #E4CB6F, #06A9C0) 1 1 1;
		background-color: #000;
	}
	@media (max-width: 1000px) {
		width: 60% !important;
		font-size: 14px;
	}
	@media (max-width: 800px) {
		width: 70% !important;
		font-size: 12px;
	}
	@media (max-width: 700px) {
		width: 80% !important;
		font-size: 10px;

	}
`

const Boxletter = styled(Box)`
	background: linear-gradient(150deg,  #659900 20%,#DB5994 50% ,#7735BD 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: 1000px) {
		font-size: 60px;
	}
	@media (max-width: 800px) {
		margin-top:20%;
		font-size: 40px;
	}
	@media (max-width: 600px) {
		font-size: 30px;

	}

`

const Boxletter1 = styled(Box)`
	font-style: normal;
	font-weight: 200;
	font-size: 36px;
	line-height: 36px;
	text-align: center;
	text-transform: uppercase;
	background: linear-gradient(150deg,  #659900 20%,#DB5994 50% ,#7735BD 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: 1000px) {
		font-size: 30px;
	}
	@media (max-width: 800px) {
		font-size: 25px;
	}
	@media (max-width: 700px) {
		font-size: 20px;

	}

	
`

const Reservebody = styled(Box)`
	width: 100%;
	/* height: 100vh; */
	background-color: black;
	background-image: url(${back_img1});
	background-repeat: repeat-y;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* overflow: scroll; */
`
