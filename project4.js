// ここから書いてください。
initializeApp();

const config = {
    title : document.getElementById("title"),
    step1 : document.getElementById("step1"),
    step2 : document.getElementById("step2"),
    step3 : document.getElementById("step3"),
    step4 : document.getElementById("step4"),
    result : document.getElementById("result"),
    url : "https://api.recursionist.io/builder/computers?type="
}

class View{
    static makeTitle(){
        config.title.innerHTML = `
            <h1 class="text-center text-white">Build Your Own PC</h1>
        `
        config.title.classList.add("col-12", "p-3", "bg-secondary");
    }

    static initializeBtn(btnId){
        let btnDisplay = document.getElementById(btnId);
        btnDisplay.innerHTML = "-----";
    }

    static makeEmptyButtonHTML(item, name){
        let htmlString = `
            <p class="mx-3 font-item">${item}</p>
            <div class="dropdown mb-3">
                <button id="${name}" role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    -----
                </button>
                <ui id="${name}List" class="dropdown-menu" aria-labelledby="${name}">
                    
                </ui>
            </div>
        `
        return htmlString;
    }

    static makeDropDown(btns){
        let makeHTML = "";
        for (let i = 0; i < btns.length; i++){
            let current = btns[i];
            makeHTML += View.makeEmptyButtonHTML(current["item"] , current["btnId"]);
        }
        return makeHTML;
    }

    static makeDropDownStep(type, tag, btns){
        config[tag].innerHTML += View.makeDropDown(btns);
    }

    static makeDropDownListHTML(f , tempBtnId, type, tag, item, currentItem){
        let stringHTML = `
            <li><button class="dropdown-item" type="button" id="${tempBtnId}" onclick="Control.${f}('${type}', '${tag}' ,'${item}' ,'${currentItem}')">${currentItem}</button></li>`;
        return stringHTML; 
    }

    static makeDropDownBrandList(type, tag, btns){
        let check = [];
        let makeHTML = "";

        let selectedAmount;
        let limitation = true;  

        for (let i = 0; i < btns.length; i++){
            let tempBtnId = btns[i]["btnId"];

            if ((tag === "step3" || tag === "step4") && Control.doesInvolve(tempBtnId, "Amount")) selectedAmount = document.getElementById(btns[i]["btnId"]).innerHTML;

            if (Control.doesInvolve(tempBtnId, "Brand")){
                fetch(config.url+type).then(response=>response.json()).then(data=>{
                    for (let tempData in data){
                        let current = data[tempData];
                        let currentAmount;

                        if (tag === "step3") currentAmount = Control.getAmount(current["Model"], "x");
                        if (tag === "step4") currentAmount = Control.getAmount(current["Model"], "B");
                        limitation = currentAmount === selectedAmount;

                        if (check.indexOf(current["Brand"]) === -1 && limitation){
                            check.push(current["Brand"]);
                        }
                    }
                    check.sort();
                    for(let i = 0; i < check.length; i++){
                        makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Brand", check[i]);
                    }
                    document.getElementById(tempBtnId+"List").innerHTML = "";
                    document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
                })
            }
        }            
    }

    static makeDropDownModelList(type, tag, btns){
        let check = [];
        let makeHTML = "";
        let selectedBrand;
        let selectedAmount;
        let limitation = true;      

        for (let i = 0; i < btns.length; i++){
            let tempBtnId = btns[i]["btnId"];

            if (Control.doesInvolve(tempBtnId, "Brand")) selectedBrand = document.getElementById(btns[i]["btnId"]).innerHTML;

            if ((tag === "step3" || tag === "step4") && Control.doesInvolve(tempBtnId, "Amount")) selectedAmount = document.getElementById(btns[i]["btnId"]).innerHTML;

            if (Control.doesInvolve(tempBtnId, "Model")){
                fetch(config.url+type).then(response=>response.json()).then(data=>{
                    for (let tempData in data){
                        let current = data[tempData];
                        let currentAmount;

                        if (tag === "step3") currentAmount = Control.getAmount(current["Model"], "x");
                        if (tag === "step4") currentAmount = Control.getAmount(current["Model"], "B");
                        limitation = currentAmount === selectedAmount;

                        if (check.indexOf(current["Model"]) === -1 && current["Brand"] === selectedBrand && limitation){
                            check.push(current["Model"]);
                        }
                    }
                    check.sort();
                    for(let i = 0; i < check.length; i++){
                        makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Model", check[i]);
                    }
                    document.getElementById(tempBtnId+"List").innerHTML = "";
                    document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
                })
            }
        }            
    }

    static makeDropDownFirstStep4(type, tag, btns){
        let makeHTML = "";
        let tempBtnId = "storageTypeBtn";

        makeHTML += View.makeDropDownListHTML("display" , tempBtnId, type, tag,"storageType" , "HDD");
        makeHTML += View.makeDropDownListHTML("display" , tempBtnId, type, tag, "storageType", "SSD");
        document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
        
    }

    // RamやStorageの個数や容量を取得し、リストとして格納する
    static makeDropDownAmount(type, tag, btns, btnId, word){
        let check = [];
        let makeHTML = "";
        let tempBtnId = btnId;

        fetch(config.url+type).then(response=>response.json()).then(data=>{
            for (let tempData in data){
                let current = data[tempData];
                let amount = Control.getAmount(current["Model"], word);
                if (check.indexOf(amount) === -1){
                    check.push(amount);
                }
            }
            check.sort();
            
            if (word === "B"){
                let listTB = [];
                let listGB = [];
                let listMB = [];
                for(let i = 0; i < check.length; i++){
                    let volume = check[i].charAt(check[i].lastIndexOf("B") - 1);
                    
                    if (volume === "T") listTB.push(parseFloat(check[i].substring(0, check[i].lastIndexOf("B") - 1)));
                    else if (volume === "G") listGB.push(parseFloat(check[i].substring(0, check[i].lastIndexOf("B") - 1)));
                    else if (voluem === "M") listMB.push(parseFloat(check[i].substring(0, check[i].lastIndexOf("B") - 1)));
                }
                
                listTB.sort((a, b) => b - a);
                listGB.sort((a, b) => b - a);
                listMB.sort((a, b) => b - a);
                
                listTB = Control.addUnit(listTB, "TB");
                listGB = Control.addUnit(listGB, "GB");
                listMB = Control.addUnit(listMB, "MB");

                let tempList = listTB.concat(listGB);
                check = tempList.concat(listMB);
            }
            
            for(let i = 0; i < check.length; i++){
                makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Amount", check[i]);
            }
            document.getElementById(tempBtnId+"List").innerHTML = "";
            document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
        })
    }

    // AddPCボタンの作成
    static makeAddPCBtnView(){
        let target = document.getElementById("addPC");
        target.classList.add("ml-3", "mt-5");
        target.innerHTML = `
            <button id="addPCBtn" class="btn btn-primary" type="submit">add PC</button>
        `
        let count = 1;
        let targetBtn = document.getElementById("addPCBtn");
        targetBtn.addEventListener("click",()=>{
            if(Control.isSelectedAll()) count = View.makeResultTable(Control.getSelectedValues(),count);
            else alert("Please select all items.")
        });
    }

    static makeStep1View(flag){
        let btns = [{
                        "item":"Brand",
                        "btnId":"cpuBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"cpuModelBtn"
                    }];
        if(flag){
            View.makeDropDownStep("cpu", "step1",btns);
            View.makeDropDownBrandList("cpu", "step1", btns);
        }
        return btns;
    }

    static makeStep2View(flag){
        let btns = [{
                        "item":"Brand",
                        "btnId":"gpuBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"gpuModelBtn"
                    }];
        if(flag){
            View.makeDropDownStep("gpu" , "step2",btns);
            View.makeDropDownBrandList("gpu" , "step2", btns);
        }
        return btns;
    }

    static makeStep3View(flag){
        let btns = [{
                        "item":"How Many?",
                        "btnId":"ramAmountBtn"
                    },            
                    {
                        "item":"Brand",
                        "btnId":"ramBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"ramModelBtn"
                    }];
        if (flag){
            View.makeDropDownStep("ram" , "step3",btns);
            View.makeDropDownAmount("ram", "step3", btns, "ramAmountBtn", "x");
            View.makeDropDownBrandList("ram", "step3", btns);
        }
        return btns;
    }

    static makeStep4View(flag){
        let btns = [{
                        "item":"HDD or SSD?",
                        "btnId":"storageTypeBtn"
                    },
                    {
                        "item":"Storage",
                        "btnId":"storageAmountBtn"
                    },             
                    {
                        "item":"Brand",
                        "btnId":"storageBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"storageModelBtn"
                    }];
        if(flag){
            View.makeDropDownStep("dummy" ,"step4",btns);
            View.makeDropDownFirstStep4("dummy", "step4", btns);
            View.makeDropDownBrandList("dummy", "step4", btns);
        }
        return btns;
    }

    // PC SPECを表で表示する
    static makeResultTable(pcInfo,count){
        let resultHTML = "";
            
        resultHTML += `
            <tr>
            <th scope="row">CPU</th>
            <td>-</td>
            <td>${pcInfo["cpuBrandBtn"]}</td>
            <td>${pcInfo["cpuModelBtn"]}</td>
            </tr>

            <tr>
            <th scope="row">GPU</th>
            <td>-</td>
            <td>${pcInfo["gpuBrandBtn"]}</td>
            <td>${pcInfo["gpuModelBtn"]}</td>
            </tr>

            <tr>
            <th scope="row">RAM</th>
            <td>-</td>
            <td>${pcInfo["ramBrandBtn"]}</td>
            <td>${pcInfo["ramModelBtn"]}</td>
            </tr>

            <tr>
            <th scope="row">Storage</th>
            <td>${pcInfo["storageTypeBtn"]}</td>
            <td>${pcInfo["storageBrandBtn"]}</td>
            <td>${pcInfo["storageModelBtn"]}</td>
            </tr>
        `
        
        config.result.innerHTML += `
        <p class="ml-3 mt-5 font-step">★Your PC${count} Spec!!</p>
        <table class="table table-bordered ml-3 table-dark">
            <thead>
                <tr>
                <th scope="col">PC${count}</th>
                <th scope="col">Type</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                </tr>
            </thead>
            <tbody>
                ${resultHTML}
            </tbody>
        </table>

        <p id="gameScore${count}" class="ml-5 mt-2 font-step">Gaming: </p>
        <p id="workScore${count}" class="ml-5 mt-2 font-step">Working: </p>
        `

        let storageType = document.getElementById("storageTypeBtn").innerHTML;
        Control.calcScore(pcInfo, 0.6, 0.25, 0.125, 0.025, storageType.toLowerCase(), "gameScore"+count);
        Control.calcScore(pcInfo, 0.25, 0.6, 0.1, 0.05, storageType.toLowerCase(), "workScore"+count);
        count++;
        return count;
    }
}

class Control{
    // 選択された項目の値をすべて取得。
    static getSelectedValues(){
        let ans = {};
        let btnIds = document.getElementById("target").querySelectorAll(".btn");
        
        // addPCのinnerHTMLは無視するためにbtnIds.length-1まで
        for (let i = 0; i < btnIds.length-1; i++){
            ans[btnIds[i].id] = btnIds[i].innerHTML;
        }
        return ans;
    }

    // 指定項目が全部InputされているかどうかのBoolean値を返す
    static isSelectedAll(){
        let values = Control.getSelectedValues();
        for (let value in values){
            let current = values[value];
            if (current.indexOf("-----") !== -1) return false;
        }
        return true;
    }

    // (string1, string2) => boolean  string1にstring2が含まれるかどうか
    static doesInvolve(string1, string2){
        return (string1.indexOf(string2) !== -1);
    }

    // str内の一番最後のスペースのインデックスからstr内の一番最後の指定wordのインデックスまでに含まれる文字を返す 
    static getAmount(str,word){
        let start;
        let end = str.lastIndexOf(word);
        if (end === -1) return null;

        if (word === "B"){
            if (str.charAt(str.lastIndexOf(word)-1) === "M"){
                end = str.substring(0, str.lastIndexOf(word)-1).lastIndexOf(word);
            }
        }
        for (let i = end; i >= 0; i--){
            if (str.charAt(i) === " "){
                start = i+1;
                break;
            }
        }
        
        if (word === "B") end++;
        let amount = str.substring(start,end);
        return amount;
    }

    // valueList配列の要素にunitを加えて、配列で返す
    static addUnit(valueList, unit){
        let ans = [];
        for(let i = 0; i < valueList.length; i++){
            ans.push(valueList[i] + unit);
        }
        return ans;
    }

    static display(type, tag, item , value){
        let valueBtnId;
        // 文字リテラルでbtnsをうまく渡せないので再構築...
        let btns;
        let index;
        if (tag === "step1") btns = View.makeStep1View(false);
        else if (tag === "step2") btns = View.makeStep2View(false);
        else if (tag === "step3") btns = View.makeStep3View(false);
        else btns = View.makeStep4View(false);

        for (let i = 0; i < btns.length; i++){
            let tempBtnId = btns[i]["btnId"];
            

            if (Control.doesInvolve(tempBtnId, item)){
                valueBtnId = tempBtnId;
                index = i;
            }
        }
        let valueTag = document.getElementById(valueBtnId);
        if (valueTag.innerHTML !== value){
            valueTag.innerHTML = value;
            for (let i = index+1; i < btns.length; i++){
                View.initializeBtn(btns[i]["btnId"]);
            }
        }
        if (valueBtnId === "storageTypeBtn"){
            View.makeDropDownBrandList(value.toLowerCase() ,"step4",btns);
            View.makeDropDownAmount(value.toLowerCase(), "step4", btns, "storageAmountBtn", "B")
        }
        if (Control.doesInvolve(valueBtnId, "Amount")) View.makeDropDownBrandList(type, tag, btns);
        if (Control.doesInvolve(valueBtnId, "Brand")) View.makeDropDownModelList(type, tag, btns);
    }

    // Scoreの計算。
    static calcScore(pcInfo, cpuK, gpuK, ramK, storageK, type, id){
        let value = 0;
        let scoreTag = document.getElementById(id);
        fetch(config.url+"cpu").then(response=>response.json()).then(datas=>{
            for (let data in datas){
                let curr = datas[data];
                if (curr["Brand"] === pcInfo["cpuBrandBtn"] && curr["Model"] === pcInfo["cpuModelBtn"]){
                    value += curr["Benchmark"] * cpuK;
                }
            }           
        }).then(()=>{
            fetch(config.url+"gpu").then(response=>response.json()).then(datas=>{
                for (let data in datas){
                    let curr = datas[data];
                    if (curr["Brand"] === pcInfo["gpuBrandBtn"] && curr["Model"] === pcInfo["gpuModelBtn"]){
                        value += curr["Benchmark"] * gpuK;
                    }
                }
            })    
        }).then(()=>{
            fetch(config.url+"ram").then(response=>response.json()).then(datas=>{
                for (let data in datas){
                    let curr = datas[data];
                    if (curr["Brand"] === pcInfo["ramBrandBtn"] && curr["Model"] === pcInfo["ramModelBtn"]){
                        value += curr["Benchmark"] * ramK;
                    }
                }
            })    
        }).then(()=>{
            fetch(config.url+type).then(response=>response.json()).then(datas=>{
                for (let data in datas){
                    let curr = datas[data];
                    if (curr["Brand"] === pcInfo["storageBrandBtn"] && curr["Model"] === pcInfo["storageModelBtn"]){
                        value += curr["Benchmark"] * storageK;
                        scoreTag.innerHTML += Math.round(value) + "%";
                        // console.log(value);
                    }
                }
            })    
        });

    }

}

function initializeApp(){
    let target = document.getElementById("target");
    target.innerHTML = `
        <div class="container bg-light border pb-3">
            <div class="row">
                <div id="title">
                </div>
            </div>
            <div class="row">
                <div>
                    <p class="text-start font-step ml-3">step1: Select your CPU</p>
                    <div id="step1" class="row m-0">
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <p class="font-step ml-3">step2: Select your GPU</p>
                    <div id="step2" class="row m-0">
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <p class="font-step ml-3">step3: Select your Memory Card</p>
                    <div id="step3" class="row m-0">
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <p class="font-step ml-3">step4: Select your storage</p>
                    <div id="step4" class="row m-0">
                    </div>
                </div>
            </div>
            <div class="row">
                <div id="addPC">
                </div>
            </div>
            <div class="row">
                <div id="result">
                </div>
            </div>
        </div>
    `
}

View.makeTitle();
View.makeStep1View(true);
View.makeStep2View(true);
View.makeStep3View(true);
View.makeStep4View(true);
View.makeAddPCBtnView();