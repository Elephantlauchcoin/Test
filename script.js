document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectWallet');
    const walletAddress = document.getElementById('walletAddress');

    connectButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                // Meminta akses ke akun wallet
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Menginisialisasi Web3 dengan provider MetaMask
                const web3 = new Web3(window.ethereum);

                // Mendapatkan alamat akun wallet
                const accounts = await web3.eth.getAccounts();
                walletAddress.innerText = `Connected: ${accounts[0]}`;
            } catch (error) {
                console.error("Error connecting wallet:", error);
                walletAddress.innerText = "Failed to connect wallet.";
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    });
});