// I sincerely hope you haven't come here for the answers...
// If you have, good luck, they're right here! ;)

const answers = [
    '79dba0998f167f68d5afbc64862f4b568dbd3e6ba1738764a82e0c450e65996d',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
]

let index = 0

function start() {
    if (index === 0){
        document.getElementById('content').innerHTML += `
        <h4>Enter the correct answers to proceed.</h4><br>
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <h5>0: </h5>
            </div>
            <div class="col-auto">
                <input class="form-control" name="q${index}" type="text">
            </div>
            <div class="col-auto">
                <button class="btn btn-secondary" type="submit" name="s${index}" onclick="checkAnswer(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
                </button>
            </div>
        </div>
        `
        index++
    }
}

async function checkAnswer(number) {
    const element = document.getElementsByName('q' + number)[0]
    if (await sha256(element.value) === answers[number]) {
        console.log('correct answer')
        element.classList.remove('incorrect-answer')
        element.classList.add('correct-answer')
    }
    else {
        element.classList.add('incorrect-answer')
        element.classList.remove('correct-answer')
    }
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}