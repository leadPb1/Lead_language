// 납랭 인터프리터
let variables = {}; // 변수 저장 공간

function runLeadLang() {
    let code = document.getElementById("code").value;
    let outputArea = document.getElementById("output");
    outputArea.innerHTML = ""; // 출력창 초기화

    let lines = code.split("\n"); // 코드 줄 단위로 나누기
    let mathEnabled = false; // 수학 기능 활성화 여부

    for (let line of lines) {
        line = line.trim();

        // 출력 기능 (leprint)
        if (line.startsWith("leprint(") && line.endsWith(")")) {
            let content = line.slice(8, -1);
            if (variables[content] !== undefined) {
                outputArea.innerHTML += variables[content] + "<br>";
            } else {
                outputArea.innerHTML += content.replace(/"/g, '') + "<br>";
            }
        }

        // 변수 선언 (levar)
        else if (line.startsWith("levar [") && line.endsWith("]")) {
            let parts = line.slice(7, -1).split(" = ");
            let varName = parts[0].trim();
            let varValue = isNaN(parts[1]) ? parts[1].trim().replace(/"/g, '') : Number(parts[1]);
            variables[varName] = varValue;
        }

        // 수학 기능 활성화 (leaport math)
        else if (line === "leaport math") {
            mathEnabled = true;
        }

        // 사칙연산 (leaport math가 활성화된 경우)
        else if (mathEnabled && line.includes("^")) {
            let expParts = line.split("^");
            let result = Math.pow(Number(expParts[0]), Number(expParts[1]));
            outputArea.innerHTML += result + "<br>";
        }

        // 반복문 (leapeat)
        else if (line.startsWith("leapeat (") && line.endsWith("):")) {
            let repeatCount = Number(line.slice(8, -2).trim());
            let nextLine = lines[lines.indexOf(line) + 1]?.trim();
            if (nextLine.startsWith("leprint(") && nextLine.endsWith(")")) {
                let content = nextLine.slice(8, -1);
                for (let i = 0; i < repeatCount; i++) {
                    outputArea.innerHTML += content.replace(/"/g, '') + "<br>";
                }
            }
        }
    }
}
