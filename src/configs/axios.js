import axios from 'axios';
const tokenID = "7c5be815b2f8e7679bde56fba26e08339d972dba5fe892d4ab8605a5de2a3d792a20e7469197785e4f15540a40cbbd54b5e94a3feaedde8bd6a52659449c166bd13ad3932939c925fa6df71e3864327a0f2f3473cdf18f3367ba9693cf6568ada796898d515cc6a618b3e43eaa51ad1fb9c355453cdcf7aa81fa2d2e012c5180";
const _axios = axios.create({
	// Configuration
	baseURL: 'http://localhost:1337/api/',
	timeout: 8000,
	headers: {
		Authorization : `Bearer ${tokenID}`
	},
});

module.exports = _axios;