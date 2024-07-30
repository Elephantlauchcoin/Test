document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectWallet');
    const walletAddress = document.getElementById('walletAddress');
    const presaleForm = document.getElementById('presaleForm');

    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Meminta akses ke akun wallet
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Menginisialisasi Web3 dengan provider MetaMask
                const web3 = new Web3(window.ethereum);

                // Menampilkan alamat akun wallet
                walletAddress.innerText = `Connected: ${accounts[0]}`;
                presaleForm.style.display = 'block';
            } catch (error) {
                console.error("Error connecting wallet:", error);
                walletAddress.innerText = "Failed to connect wallet.";
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    });

    presaleForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;

        if (amount > 0) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const valueInWei = web3.utils.toWei(amount, 'ether');

                // Ganti alamat kontrak di sini dengan alamat kontrak smart contract Anda
                const contractAddress = '0x2DD6039653d993E609B1b416d181577184daCA2F';

                // Transaksi untuk membeli token
                const transactionParameters = {
                    to: contractAddress,
                    from: accounts[0],
                    value: valueInWei,
                };

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                alert('Transaction successful!');
            } catch (error) {
                console.error("Error during transaction:", error);
                alert('Transaction failed!');
            }
        } else {
            alert('Please enter a valid amount.');
        }
    });
});
