import React, { useState, useEffect, useMemo } from "react";
import { ethers } from 'ethers';
import styled from 'styled-components'
import { Box, Modal } from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { FaMediumM } from 'react-icons/fa'
import { BsArrowDown, BsDiscord, BsTwitter, BsTelegram } from 'react-icons/bs';
import { useWeb3React } from '@web3-react/core';

import back_img1 from "../../assets/right_panel_reserve2.png";
import eth1 from '../../assets/eth1.png';
import faith1 from '../../assets/faith1.png';
import Token from '../../connectors/Token.json';
import { RESERVE_ABI, FAITH_TOKEN_ABI } from '../../connectors/abi';
import { CONTRACTS } from '../../connectors/constant';
import Web3 from "web3";

export default function Reserve({ flag_con_wallet, set_claim }) {
	const { account, library, chainId } = useWeb3React()
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [balace_eth, set_eth] = useState(0);
	const [balace_faith, set_faith] = useState(0);
	const [rate, set_rate] = useState(0);
	const [value_eth, set_value1] = useState('');
	const [value_faith, set_value2] = useState('');
	const [flag_success, set_success] = useState(false);
	const [btn_flg, set_btn] = useState(false);

	const reserveContract = useMemo(() => library ? new ethers.Contract(CONTRACTS.RESERVE, RESERVE_ABI, library.getSigner()) : null, [library]);
	const tokenContract = useMemo(() => library ? new ethers.Contract(CONTRACTS.FAITH_TOKEN, FAITH_TOKEN_ABI, library.getSigner()) : null, [library])

	useEffect(() => {
		getData();
	});

	async function getData() {
		window.web3 = new Web3(window.web3.currentProvider);
		await window.ethereum.enable();
		const accounts = await window.web3.eth.getAccounts();
		window.web3.eth.getBalance(accounts[0], function (err, result) {
			var temp = window.web3.utils.fromWei(result, "ether");
			set_eth(parseFloat(temp).toFixed(4));
		})
		let contract = new window.web3.eth.Contract(Token.abi, "0xcac6338567608fe59ab5dd8fcda97a1135e5a102");
		const faith_wei = await contract.methods.getPriceInWei().call();
		const faith_bal = await contract.methods.claimedTotal().call();
		const temp_faith = window.web3.utils.fromWei(faith_bal, "ether");
		set_faith(parseFloat(temp_faith).toFixed(4));
		const temp = window.web3.utils.fromWei(faith_wei, "ether");
		const rate1 = 1 / temp;
		set_rate(rate1);
	}



	const trans_success = async () => {
		if (btn_flg === true) {
			alert("Can't click reserve button any more. Please wait until reserving");
			return;
		}
		else {
			console.log('hrere');
			set_btn(true);
			window.web3 = new Web3(window.web3.currentProvider);
			const accounts = await window.web3.eth.getAccounts();
			let contract = new window.web3.eth.Contract(Token.abi, "0xcac6338567608fe59ab5dd8fcda97a1135e5a102");
			var amount_eth;
			amount_eth = Math.floor(value_eth * Math.pow(10, 18));
			const k = "0x" + amount_eth;
			console.log(k);
			const t = Math.floor(value_faith);
			console.log(t)
			const a = "0x" + t;
			console.log(a);
			await contract.methods.hold(amount_eth, t).send({ from: accounts[0], value: amount_eth }).then(async (res) => {
				set_claim(t);
				handleClose();
				set_success(true);
				set_btn(false);
			});
		}

	}

	const style1 = {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 30,
	};

	const style2 = {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#2DAFB2',
		justifyContent: 'center',
		height: '540px',
		position: ' relative'

	};

	return (
		<Reservebody >
			<Boxletter display="flex" marginTop="15%" color="white" justifyContent="center" fontSize="72px" fontWeight="200" lineHeight="72px" >RESERVE</Boxletter>
			<Box textAlign="center" color="white" fontSize="16px" lineHeight="28px" marginTop="2%">
				Event state and details go here. ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut<br />
				laoreet dolore magna aliquam erat volutpat.  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis <br />
				nisl ut aliquip ex ea commodo consequat.
			</Box>
			<Before flag_success={flag_success ? 1 : 0} alignItems="center" flexDirection="column" width="60%" height="400px" border="1px solid rgb(112 63 145)" marginTop="5%" bgcolor="rgba(42, 20, 72, 0.85)">
				<Boxletter1 display="flex" flex="1" justifyContent="center" alignItems="center">Reserve your faith tribe</Boxletter1>
				<Letter2 flex="2" textAlign="center" color="white" fontSize="16px" lineHeight="28px" fontWeight="normal">
					Reserve details go here. ipsum dolor sit amet, consectetuer adipiscing elit,<br />
					sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna <br />
					aliquam erat volutpat. <br />
					<br />
					Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper <br />
					suscipit lobortis nisl ut aliquip ex ea commodo consequat.
				</Letter2>
				<Box display="flex" flex="1" justifyContent="center" alignItems="center" color="white" fontSize="16px" lineHeight="28px" fontWeight="normal">Balance: {balace_eth + "ETH"}</Box>
				<Box display="flex" flex="1" justifyContent="center" alignItems="flex-start" width="28%">
					<Btnreserve1 display="flex" justifyContent="center" alignItems="center" onClick={() => { handleOpen() }}> RESERVE</Btnreserve1>
				</Box>

			</Before>

			<Success flag_success={flag_success ? 1 : 0} alignItems="center" flexDirection="column" width="60%" height="341px" border="1px solid rgb(112 63 145)" marginTop="5%" bgcolor="rgba(42, 20, 72, 0.85)">
				<Boxletter1 display="flex" flex="1" justifyContent="center" alignItems="center">RESERVATION SUCCESSFUL!</Boxletter1>
				<Letter3 flex="2" textAlign="center" color="white" fontSize="16px" lineHeight="28px" fontWeight="normal">
					Congratulations on reserving your FAITH TRIBE!
					<br />
					<br />

					We encourage you to share on Twitter and join the FAITH CONNECTION <br />
					TRIBE Discord to get involved in governance.
				</Letter3>
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
				<ReserveM sx={style1}>
					<Box display="flex" justifyContent="center" marginBottom="2%" fontSize="72px" lineHeight="72px" fontWeight="200" sx={{
						'background': 'linear-gradient(150deg,  #E4CB6F 20%,#DB5994 50% ,#7735BD 60%)',
						'-webkit-background-clip': 'text',
						'-webkit-text-fill-color': 'transparent'
					}}>RESERVE</Box>
					<Box sx={style2}>
						<Box display="flex" flex="0.5" flexDirection="column" width="100%">
							<Box display="flex" fontSize='24px' fontWeight='bold' color='white' lineHeight='28px' marginTop="2%" justifyContent="flex-end" marginRight="2%"
								onClick={() => {
									handleClose();
									set_btn(false)
								}}><MdClose fontSize="24px" color="white"></MdClose>
							</Box>
							<Box display="flex" fontSize='24px' color='white' lineHeight='28px' justifyContent="center" marginTop="2%" >RESERVE FAITH TRIBE</Box>
						</Box>
						<ReserveUp display="flex" flex="1" marginTop="3%" width="80%" border="1px solid white">
							<Box display="flex" flex="7" flexDirection="column" marginLeft="5%">
								<Box display="flex" flex='2' alignItems="center" fontSize="16px" color="white" lineHeight="19px" fontWeight="bold" >
									<img src={eth1} width="42px" alt=""></img><Box marginLeft="5%">ETH</Box>
								</Box>
								<Box display="flex" flex='1' alignItems="flex-start">
									<Box display="flex" marginRight="5%" fontSize="14px" color="white" style={{ opacity: '0.6' }} lineHeight="18px">Balance:{'\u00a0'}{'\u00a0'}{balace_eth}{'\u00a0'}ETH</Box>
									<Box display="flex" fontSize="14px" color="white" lineHeight="18px" fontWeight="bold">( MAX )</Box>
								</Box>
							</Box>
							<Box display="flex" flex="5" justifyContent="center" alignItems="center" >
								<Box display="flex" component="input" placeholder="0.0" color="white" bgcolor="#2DAFB2" fontWeight="300" fontSize="30px" lineHeight="130%" width="80%"
									value={value_eth}
									onChange={(e) => {
										if (parseFloat(e.target.value) > balace_eth) {
											alert("You must input value less than max value!");
											set_value1('');
											set_value2('');
											return;
										}
										else {
											set_value1(e.target.value)
											var temp = e.target.value;
											var temp1 = temp * rate;
											if (e.target.value > balace_eth) {
												alert("Your inputed eth value is higher than balance of eth! Please retry!");
												set_value1('');
												set_value2('');
												return;
											}
											//console.log(temp1);
											set_value2(temp1);
										}

									}}>

								</Box>
							</Box>
						</ReserveUp>
						<ReserveDown display="flex" flex="1" marginTop="3px" width="80%" border="1px solid white">
							<Box display="flex" flex="7" flexDirection="column" marginLeft="5%">
								<Box display="flex" flex='2' alignItems="center" fontSize="16px" color="white" lineHeight="19px" fontWeight="bold">
									<img src={faith1} width="42px" alt=""></img><Box marginLeft="5%">FAITH TRIBE</Box>
								</Box>
								<Box display="flex" flex='1' alignItems="flex-start">
									<Box display="flex" marginRight="5%" fontSize="14px" color="white" style={{ opacity: '0.6' }} lineHeight="18px">Reserved:{'\u00a0'}{'\u00a0'}{balace_faith}{'\u00a0'}FAITH</Box>
									{/* <Box display="flex" fontSize="14px" color="white" lineHeight="18px" fontWeight="bold">( MAX )</Box> */}
								</Box>
							</Box>
							<Box display="flex" flex="5" justifyContent="center" alignItems="center" >
								<Box display="flex" value={value_faith} component="input" disabled="disabled" placeholder="0.0" fontWeight="300" fontSize="18px" lineHeight="130%" color="white" bgcolor="#2DAFB2" width="80%">
								</Box>
							</Box>
						</ReserveDown>
						<Box display="flex" flex="1" width="100%" alignItems="center" justifyContent="center">
							{
								!flag_con_wallet ? <Box display="flex" width="40%" height="38px" bgcolor="white" style={{ opacity: '0.3' }} color="#2DAFB2" alignItems="center" justifyContent="center" fontSize="16px" lineHeight="19px">RESERVE</Box> :
									<Btnreserve display="flex" width="40%" height="38px" bgcolor="white" color="#2DAFB2" alignItems="center" justifyContent="center" fontSize="16px" lineHeight="19px" onClick={() => { trans_success(); }}>RESERVE</Btnreserve>
							}

						</Box>
						<LetterETH display="flex" flex="1" justifyContent="center" lineHeight="130%" fontWeight="300" color="white">
							1 ETH = {parseFloat(rate).toFixed(4)}{'\u00a0'}FAITH
						</LetterETH>
						<Box position="absolute" display="flex" justifyContent="center" alignItems="center" borderRadius="100%" width="29px" height="29px" bgcolor="white" top="36%">
							<BsArrowDown color="#06A9C0" fontSize="25px" fontWeight="bold"></BsArrowDown>
						</Box>
					</Box>
				</ReserveM>
			</Modal>

		</Reservebody >
	);
}

const ReserveUp = styled(Box)`
	@media (max-width: 600px) {
		flex-direction: column;
	}
	
`

const ReserveDown = styled(Box)`
	@media (max-width: 600px) {
		flex-direction: column;
	}
`

const LetterETH = styled(Box)`
	font-size: 32px;
	@media (max-width: 1000px) {
		font-size: 30px;
	}
	@media (max-width: 600px) {
		font-size: 26x;
	}
	@media (max-width: 400px) {
		font-size: 20px;
	}
`

const ReserveM = styled(Box)`
	width: 40%;
	@media (max-width: 1200px) {
		width: 60%;
	}
	@media (max-width: 850px) {
		width: 70%;
	}
	@media (max-width: 750px) {
		width: 85%;
	}

`

const Letter3 = styled(Box)`
	@media (max-width: 1200px) {
		font-size:15px;
	}
	@media (max-width: 1000px) {
		font-size: 12px;
	}
	@media (max-width: 800px) {
		font-size: 10px;
	}
	@media (max-width: 700px) {
		font-size: 8px;
	}
`

const Letter2 = styled(Box)`
	@media (max-width: 1200px) {
		font-size:14px;
	}
	@media (max-width: 1000px) {
		font-size: 12px;
	}
	@media (max-width: 800px) {
		font-size: 10px;
	}
	@media (max-width: 700px) {
		font-size: 8px;
	}

`

const Before = styled(Box)`
	display: ${({ flag_success }) => flag_success ? 'none' : 'flex'};
	margin-bottom: 5%;
	@media (max-width: 1000px) {
		width: 70% !important;
	}
	@media (max-width: 800px) {
		width: 80% !important;
	}
	@media (max-width: 700px) {
		width: 90% !important;

	}
	
`

const Success = styled(Box)`
	display: ${({ flag_success }) => flag_success ? 'flex' : 'none'};
	margin-bottom: 5%;
	@media (max-width: 1000px) {
		width: 70% !important;
	}
	@media (max-width: 800px) {
		width: 80% !important;
	}
	@media (max-width: 700px) {
		width: 90% !important;

	}

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

	width: 100%;
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
	@media (max-width: 1200px) {
		font-size:15px;
		height: 35px !important;
	}
	@media (max-width: 1000px) {
		height: 30px !important;
		font-size: 15px;
	}
	@media (max-width: 800px) {
		height: 25px !important;
		font-size: 12px;
	}
	@media (max-width: 700px) {
		height: 20px !important;
		font-size: 10px;
	}
	margin-bottom: 3%;
`

const Boxletter = styled(Box)`
	background: linear-gradient(150deg,  #659900 20%,#DB5994 50% ,#7735BD 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: 1200px) {
		font-size:65px;
	}
	@media (max-width: 1000px) {
		font-size: 60px;
	}
	@media (max-width: 800px) {
		margin-top:20%;
		font-size: 50px;
	}
	@media (max-width: 700px) {
		font-size: 40px;
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
	@media (max-width: 1200px) {
		font-size: 30px;
	}
	@media (max-width: 1000px) {
		font-size: 25px;
	}
	@media (max-width: 800px) {
		font-size: 20px;
	}
	@media (max-width: 700px) {
		font-size: 15px;

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
