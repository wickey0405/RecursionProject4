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

    static makeEmptyButtonHTML(item, name){
        let htmlString = `
            <p class="mx-3 font-item">${item}</p>
            <div class="dropdown mb-3">
                <button id="${name}" role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    項目を選択してください
                </button>
                <ui class="dropdown-menu" aria-labelledby="${name}">
                    
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

    static makeDropDownStep(tag, btns){
        config[tag].innerHTML += View.makeDropDown(btns);
        console.log(View.makeDropDown(btns));
    }

    static getAmountOfRam(str){
        let start = str.lastIndexOf(" ");
        let end = str.lastIndexOf("x");
        let amount = str.substring(start,end);
        return amount;
    }

    static makeDropDownStep3(type ,tag ,ramAmountBtnId , brandBtnId, modelBtnId){

        let check = [];
        let makeHTML = "";
        
        fetch(config.url+type).then(response=>response.json()).then(data=>{
            for (let tmp in data){
                let currentTmp = data[tmp];
                let amount = View.getAmountOfRam(currentTmp["Model"]);

                console.log(amount);

                if (check.indexOf(amount) === -1){
                    check.push(amount);
                    makeHTML += `
                        <li><button class="dropdown-item" type="button" id=${ramAmountBtnId} onclick="Control.displayAmountRam('${type}', '${tag}' ,'${amount}','${ramAmountBtnId}','${brandBtnId}','${modelBtnId}')">${amount}</button></li>`;
                }
            }
            
            config[tag].innerHTML += `
                <p class="mx-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id=${ramAmountBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui class="dropdown-menu" aria-labelledby="${ramAmountBtnId}">
                        ${makeHTML}
                    </ui>
                </div>

                <p class="mx-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id=${brandBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui class="dropdown-menu" aria-labelledby="${brandBtnId}">
                        
                    </ui>
                </div>

                <p class="mx-3 font-item">Model</p>
                <div class="dropdown mb-3">
                    <button id=${modelBtnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui class="dropdown-menu" aria-labelledby="${modelBtnId}">
                        
                    </ui>
                </div>
            `;
        });
        
    }

    static makeStep1View(){
        let btns = [{
                        "item":"Brand",
                        "btnId":"cupBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"cpuModelBtn"
                    }];
        View.makeDropDownStep("step1",btns);
    }

    static makeStep2View(){
        let btns = [{
                        "item":"Brand",
                        "btnId":"gpuBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"gpuModelBtn"
                    }];
        View.makeDropDownStep("step2",btns)
    }

    static makeStep3View(){
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
        View.makeDropDownStep("step3",btns)
    }

    static makeStep4View(){
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
                        "btnId":"ramBrandBtn"
                    },
                    {
                        "item":"Model",
                        "btnId":"ramModelBtn"
                    }];
        View.makeDropDownStep("step4",btns)
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
    static displayBrand(type, tag, brand, brandBtnId, modelBtnId){
        let brandName = document.getElementById(brandBtnId);
        if (brandName.innerHTML !== brand){
            brandName.innerHTML = brand;
            Control.displayModel(type, tag, "項目を選択してください", brandBtnId, modelBtnId);
        }
        if (tag === "step1" || tag === "step2") View.refreshDropDownModel(type, tag, brandBtnId, modelBtnId, 1);
        else if (tag === "step3") View.refreshDropDownModel(type,tag, brandBtnId, modelBtnId, 2);
        // View.makeStep2View();
    }

    static displayModel(type, tag, model, brandBtnId, modelBtnId){
        let modelName = document.getElementById(modelBtnId);
        modelName.innerHTML = model;

        // console.log(brand);
        // Control.screening();
    }

    static displayAmount(type, tag, amount, ramAmountId, brandBtnId, modelBtnId){
        let amountName = document.getElementById(ramAmountId);
        if (amountName.innerHTML !== amount){
            amountName.innerHTML = amount;
            Control.displayBrand(type, tag, "項目を選択してください", brandBtnId, modelBtnId);
        }
        View.makeDropDownStep1and2(type,tag,)
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
View.makeStep1View();
View.makeStep2View();
View.makeStep3View();
View.makeStep4View();