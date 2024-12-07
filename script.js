// 初始化答案和計數器
let answer = generateAnswer();
let attempts = 0;

// 生成隨機的 4 位數不重複數字
function generateAnswer() {
    const digits = Array.from({ length: 10 }, (_, i) => i.toString());
    const answerArray = [];
    while (answerArray.length < 4) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        answerArray.push(digits[randomIndex]);
        digits.splice(randomIndex, 1);
    }
    console.log("Generated answer:", answerArray); // 調試用
    return answerArray;
}

// 提交猜測
function submitGuess() {
    const guessInput = document.getElementById("guess");
    const guess = guessInput.value;
    const errorMessage = document.getElementById("error-message");
    const resultsDiv = document.getElementById("results");

    errorMessage.textContent = ""; // 清除錯誤訊息

    // 驗證輸入格式
    if (!/^\d{4}$/.test(guess)) {
        errorMessage.textContent = "Please enter exactly 4 unique digits.";
        return;
    }
    if (new Set(guess).size !== 4) {
        errorMessage.textContent = "Digits must be unique.";
        return;
    }

    attempts++;
    const result = checkGuess(guess.split(""), answer);
    const resultMessage = `${guess} -> ${result.a}A${result.b}B`;

    // 更新歷史記錄
    const resultNode = document.createElement("div");
    resultNode.textContent = resultMessage;
    resultsDiv.appendChild(resultNode);

    // 判斷是否猜對
    if (result.a === 4) {
        alert(`Congratulations! You've guessed the number in ${attempts} attempts.`);
        resetGame();
    }

    // 清空輸入框
    guessInput.value = "";
}

// 比對猜測結果
function checkGuess(guessArray, answerArray) {
    let a = 0; // 正確數字且位置正確
    let b = 0; // 正確數字但位置錯誤

    guessArray.forEach((digit, index) => {
        if (digit === answerArray[index]) {
            a++;
        } else if (answerArray.includes(digit)) {
            b++;
        }
    });

    return { a, b };
}

// 重置遊戲
function resetGame() {
    answer = generateAnswer();
    attempts = 0;
    document.getElementById("results").textContent = ""; // 清空歷史記錄
}

