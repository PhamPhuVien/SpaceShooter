//// These Functions Call By Index.hmtl.

function SubmitNameFunction(ref) {
    console.log('SubmitNameFunction');

    PlayerNameGB = document.getElementById('inputNameID').value;

    if (PlayerNameGB != '') {
        // Change Label To Welcome User In userNameDiv.
        document.getElementById('labelUserName').innerHTML = '<i>Hello</i> <b>' + PlayerNameGB + '</b><i>. You can change your name by submit a new one.</i>';

        // Update Player Name.
        var dataSubmit = {
            email: PlayerMailGB,
            name: PlayerNameGB,
            score: PlayerScoreGB
        };

        console.log('Emit Change Player Name');

        // Emit SubmitScore.
        SocketGB.emit('ChangePlayerName', JSON.stringify(dataSubmit));
    }
}

function LoginFunction() {
    console.log('LoginFunction');

    // Login If Not Exist Create New Player.
    PlayerMailGB = document.getElementById('inputMailID').value;

    var dataSubmit = {
        email: PlayerMailGB,
        name: PlayerNameGB,
        score: PlayerScoreGB
    };

    if (PlayerMailGB != '') {
        SocketGB.emit('PlayerLogin', JSON.stringify(dataSubmit));
    }

    // Change Label To Welcome User In userNameDiv.
    document.getElementById('labelUserName').innerHTML = '<i>Hello</i> <b>' + PlayerNameGB + '</b><i>. You can change your name by submit a new one.</i>';

    // Hide And Show Change Name Div.
    document.getElementById('userLoginDiv').style.display = 'none';
    document.getElementById('userNameDiv').style.display = 'contents';

    // Start Game.
    StartGame();
}