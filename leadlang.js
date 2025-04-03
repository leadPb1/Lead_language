// 납랭 인터프리터
let variables = {}; // 변수 저장 공간

function runLeadLang() {
    let code = document.getElementById("code").value;
    let outputArea = document.getElementById("output");
    outputArea.innerHTML = ""; // 출력창 초기화

    let lines = code.split("\n"); // 코드 줄 단위로 나누기
    let mathEnabled = false; // 수학 기능 활성화 여부
    let i = 0;

    while (i < lines.length) {
        let line = lines[i].trim();

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

        // 반복문 (leapeat)
        else if (line.startsWith("leapeat (") && line.endsWith("):")) {
            let repeatCount = Number(line.slice(8, -2).trim());
            let loopLines = [];
            i++;

            // **반복문 내부 코드 수집**
            while (i < lines.length && (lines[i].startsWith("    ") || lines[i] === "")) {
                loopLines.push(lines[i]);
                i++;
            }

            // **반복문 실행**
            for (let j = 0; j < repeatCount; j++) {
                for (let loopLine of loopLines) {
                    let trimmedLine = loopLine.trim();

                    if (trimmedLine.startsWith("leprint(") && trimmedLine.endsWith(")")) {
                        let content = trimmedLine.slice(8, -1);
                        if (variables[content] !== undefined) {
                            outputArea.innerHTML += variables[content] + "<br>";
                        } else {
                            outputArea.innerHTML += content.replace(/"/g, '') + "<br>";
                        }
                    }
                }
            }

            // 반복문 끝났으니 continue 사용 (반복문 이후 코드 실행 방지)
            continue;
        }

        i++; // 다음 줄로 이동
    }
}
