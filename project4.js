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
        btnDisplay.innerHTML = "Please select";
    }

    static makeEmptyButtonHTML(item, name){
        let htmlString = `
            <p class="mx-3 font-item">${item}</p>
            <div class="dropdown mb-3">
                <button id="${name}" role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Please select
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

    // (string1, string2) => boolean  string1にstring2が含まれるかどうか
    static doesInvolve(string1, string2){
        return (string1.indexOf(string2) !== -1);
    }

    static makeDropDownStep(type, tag, btns){
        config[tag].innerHTML += View.makeDropDown(btns);
        View.makeDropDownBrandList(type, tag, btns);
    }

    static makeDropDownListHTML(f , tempBtnId, type, tag, item, currentItem){
        let stringHTML = `
            <li><button class="dropdown-item" type="button" id="${tempBtnId}" onclick="Control.${f}('${type}', '${tag}' ,'${item}' ,'${currentItem}')">${currentItem}</button></li>`;
        return stringHTML; 
    }

    static makeDropDownBrandList(type, tag, btns){
        let check = [];
        let makeHTML = "";

        for (let i = 0; i < btns.length; i++){
            let tempBtnId = btns[i]["btnId"];
            if (View.doesInvolve(tempBtnId, "Brand")){
                fetch(config.url+type).then(response=>response.json()).then(data=>{
                    for (let tempData in data){
                        let current = data[tempData];
                        if (check.indexOf(current["Brand"]) === -1){
                            check.push(current["Brand"]);
                            // makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Brand", current["Brand"]);
                        }
                    }
                    check.sort();
                    for(let i = 0; i < check.length; i++){
                        makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Brand", check[i]);
                    }
                    // console.log(makeHTML);
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

            if (View.doesInvolve(tempBtnId, "Brand")) selectedBrand = document.getElementById(btns[i]["btnId"]).innerHTML;

            if ((tag === "step3" || tag === "step4") && View.doesInvolve(tempBtnId, "Amount")) selectedAmount = document.getElementById(btns[i]["btnId"]).innerHTML;

            if (View.doesInvolve(tempBtnId, "Model")){
                fetch(config.url+type).then(response=>response.json()).then(data=>{
                    for (let tempData in data){
                        let current = data[tempData];
                        let currentAmount;

                        if (tag === "step3") currentAmount = View.getAmount(current["Model"], "x");
                        if (tag === "step4") currentAmount = View.getAmount(current["Model"], "B");
                        limitation = currentAmount === selectedAmount;

                        if (check.indexOf(current["Model"]) === -1 && current["Brand"] === selectedBrand && limitation){
                            check.push(current["Model"]);
                            // makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Brand", current["Brand"]);
                        }
                    }
                    check.sort();
                    for(let i = 0; i < check.length; i++){
                        makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Model", check[i]);
                    }
                    // console.log(makeHTML);
                    document.getElementById(tempBtnId+"List").innerHTML = "";
                    document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
                })
            }
        }            
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
        
        if (str.charAt(start) === "(") start++;
        // console.log(start + ", " + end);
        if (word === "B") end++;
        let amount = str.substring(start,end);
        // console.log(amount);
        return amount;
    }

    static addUnit(valueList, unit){
        let ans = [];
        for(let i = 0; i < valueList.length; i++){
            ans.push(valueList[i] + unit);
        }
        return ans;
    }

    static makeDropDownAmount(type, tag, btns, btnId, word){
        let check = [];
        let makeHTML = "";
        let tempBtnId = btnId;

        fetch(config.url+type).then(response=>response.json()).then(data=>{
            for (let tempData in data){
                let current = data[tempData];
                let amount = View.getAmount(current["Model"], word);
                if (check.indexOf(amount) === -1){
                    check.push(amount);
                    // makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Amount", amount);
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
                
                listTB = View.addUnit(listTB, "TB");
                listGB = View.addUnit(listGB, "GB");
                listMB = View.addUnit(listMB, "MB");

                let tempList = listTB.concat(listGB);
                check = tempList.concat(listMB);
                // console.log(check);
            }
            
            for(let i = 0; i < check.length; i++){
                makeHTML += View.makeDropDownListHTML("display", tempBtnId, type, tag, "Amount", check[i]);
            }
            document.getElementById(tempBtnId+"List").innerHTML = "";
            document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
        })
    }

    static makeDropDownFirstStep4(type, tag, btns){
        let makeHTML = "";
        let tempBtnId = "storageTypeBtn";

        makeHTML += View.makeDropDownListHTML("display" , tempBtnId, type, tag,"storageType" , "HDD");
        makeHTML += View.makeDropDownListHTML("display" , tempBtnId, type, tag, "storageType", "SSD");
        document.getElementById(tempBtnId+"List").innerHTML += makeHTML;
        
    }
    // static makeDropDownStep3(type ,tag ,ramAmountBtnId , brandBtnId, modelBtnId){

    //     let check = [];
    //     let makeHTML = "";
        
    //     fetch(config.url+type).then(response=>response.json()).then(data=>{
    //         for (let tmp in data){
    //             let currentTmp = data[tmp];
    //             let amount = View.getAmountOfRam(currentTmp["Model"]);

    //             console.log(amount);

    //             if (check.indexOf(amount) === -1){
    //                 check.push(amount);
    //                 makeHTML += `
    //                     <li><button class="dropdown-item" type="button" id=${ramAmountBtnId} onclick="Control.displayAmountRam('${type}', '${tag}' ,'${amount}','${ramAmountBtnId}','${brandBtnId}','${modelBtnId}')">${amount}</button></li>`;
    //             }
    //         }
            
    //         config[tag].innerHTML += `
    //             <p class="mx-3 font-item">Brand</p>
    //             <div class="dropdown mb-3">
    //                 <button id=${ramAmountBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     Please select
    //                 </button>
    //                 <ui class="dropdown-menu" aria-labelledby="${ramAmountBtnId}">
    //                     ${makeHTML}
    //                 </ui>
    //             </div>

    //             <p class="mx-3 font-item">Brand</p>
    //             <div class="dropdown mb-3">
    //                 <button id=${brandBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     Please select
    //                 </button>
    //                 <ui class="dropdown-menu" aria-labelledby="${brandBtnId}">
                        
    //                 </ui>
    //             </div>

    //             <p class="mx-3 font-item">Model</p>
    //             <div class="dropdown mb-3">
    //                 <button id=${modelBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     Please select
    //                 </button>
    //                 <ui class="dropdown-menu" aria-labelledby="${modelBtnId}">
                        
    //                 </ui>
    //             </div>
    //         `;
    //     });
        
    // }

    static makeStep1View(flag){
        let btns = [{
                        "item":"Brand",
                        "btnId":"cupBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"cpuModelBtn"
                    }];
        if(flag) View.makeDropDownStep("cpu", "step1",btns);
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
        if(flag) View.makeDropDownStep("gpu" , "step2",btns);
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
            // View.makeDropDownAmount("dummy", "step4", btns, "storageAmountBtn", "TB");
            // View.makeDropDownAmount("dummy", "step4", btns, "storageAmountBtn", "GB");
        }
        return btns;
    }

    static makeResultTable(passBatterys){
        let resultHTML = "";

        for (let i = 0; i < passBatterys.length; i++){
            resultHTML += `
                <tr>
                <th scope="row">${i}</th>
                <td>${passBatterys[i].batteryName}</td>
                <td>Estimated ${passBatterys[i].usage} hours on selected setup</td>
                </tr>
            `
        }
        
        config.result.innerHTML = `
        <p class="ml-3 font-step">step4: Choose Your Battery</p>
        <table class="table table-bordered ml-3 table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Battery Name</th>
                <th scope="col">Usage</th>
                </tr>
            </thead>
            <tbody>
                ${resultHTML}
            </tbody>
        </table>
        `
    }
}

class Control{
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
            

            if (View.doesInvolve(tempBtnId, item)){
                valueBtnId = tempBtnId;
                index = i;
            }
        }
        let valueTag = document.getElementById(valueBtnId);
        if (valueTag.innerHTML !== value){
            valueTag.innerHTML = value;
            // console.log(index);
            for (let i = index+1; i < btns.length; i++){
                // console.log(btns[i]["btnId"]);
                View.initializeBtn(btns[i]["btnId"]);
            }
            // Control.displayModel(type, tag, "Please select", valueBtnId, modelBtnId);
        }
        if (valueBtnId === "storageTypeBtn"){
            View.makeDropDownBrandList(value.toLowerCase() ,"step4",btns);
            View.makeDropDownAmount(value.toLowerCase(), "step4", btns, "storageAmountBtn", "B")
        }
        if (View.doesInvolve(valueBtnId, "Brand")) View.makeDropDownModelList(type, tag, btns);
        // View.makeStep2View();
    }

    // static displayBrand(type, tag, brand, btns){
    //     let brandBtnId;
    //     btns = config[tag].querySelectorAll(".btn");
    //     for (let i = 0; i < btns.length; i++){
    //         let tempBtnId = btns[i].id;
            
    //         if (View.doesInvolve(tempBtnId, "Brand")){
    //             brandBtnId = tempBtnId;
    //         }
    //     }
        
    //     let brandName = document.getElementById(brandBtnId);
    //     if (brandName.innerHTML !== brand){
    //         brandName.innerHTML = brand;
    //         Control.displayModel(type, tag, "Please select", brandBtnId, modelBtnId);
    //     }
    //     // View.makeStep2View();
    // }

    // static displayRamAmount(type, tag, amount, btns){
    //     let amountBtnId;
    //     btns = config[tag].querySelectorAll(".btn");
    //     for (let i = 0; i < btns.length; i++){
    //         let tempBtnId = btns[i].id;
            
    //         if (View.doesInvolve(tempBtnId, "Amount")){
    //             amountBtnId = tempBtnId;
    //         }
    //     }
        
    //     let amountTag = document.getElementById(amountBtnId);
    //     if (amountTag.innerHTML !== amount){
    //         amountTag.innerHTML = amount;
    //         Control.displayModel(type, tag, "Please select", amountBtnId, modelBtnId);
    //     }
    //     // View.makeStep2View();
    // }

    static displayModel(type, tag, model, brandBtnId, modelBtnId){
        let modelName = document.getElementById(modelBtnId);
        modelName.innerHTML = model;

        // console.log(brand);
        // Control.screening();
    }

    static screening(){
        let selectedBrand = document.getElementById("step1Btn").innerHTML;
        let selectedModel = document.getElementById("step2Btn").innerHTML;
        let selectedPowerConsumptionWh = "";
        let passBatterys = [];

        for (let i = 0; i < camera.length; i++){
            if (selectedBrand === camera[i][item] && selectedModel === camera[i].model){
                selectedPowerConsumptionWh = camera[i].powerConsumptionWh;
                break
            }
        }

        for (let j = 0; j < battery.length; j++){
            if ((battery[j].maxDraw * battery[j].endVoltage - document.getElementById("accessoryPowerConsumption").value) >= selectedPowerConsumptionWh){
                battery[j]["usage"] = Math.round((battery[j].capacityAh * battery[j].voltage / (selectedPowerConsumptionWh + document.getElementById("accessoryPowerConsumption").value))*10)/10;
                passBatterys.push(battery[j]);
            }
        }
        // console.log(passBatterys);
        View.makeResultTable(passBatterys);
    }

    static limitOfStep3(){
        if (document.getElementById("accessoryPowerConsumption").value >= 100){
            document.getElementById("accessoryPowerConsumption").value = 100;
        } else if (document.getElementById("accessoryPowerConsumption").value <= 0){
            document.getElementById("accessoryPowerConsumption").value = 0;
        }
        Control.screening();
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
                <div id="result">
                </div>
            </div>
        </div>
    `
}
// console.log(target);
View.makeTitle();
View.makeStep1View(true);
View.makeStep2View(true);
View.makeStep3View(true);
View.makeStep4View(true);

fetch(config.url+"hdd").then(response=>response.json()).then(data=>{
    for (let dataBlock in data){
        let current = data[dataBlock];
        // console.log(current);
    }
});