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

    static makeDropDown(type ,item ,target, btnId){

        let check = [];
        let makeHTML = "";

        fetch(config.url+type).then(response=>response.json()).then(data=>{
            for (let tmp in data){
                let currentTmp = data[tmp];
                if (check.indexOf(currentTmp[item]) === -1 ){
                    check.push(currentTmp[item]);
                    makeHTML += `
                        <li><button class="dropdown-item" type="button" id=${btnId} onclick="Control.displayBrand('${currentTmp[item]}', '${btnId}')">${currentTmp[item]}</button></li>`;
                }
            }
            
            target.innerHTML += `            
                <p class="mx-3 font-item">${item}</p>
                <div class="dropdown mb-3">
                    <button id=${btnId} role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui class="dropdown-menu" aria-labelledby="step1Btn">
                        ${makeHTML}
                    </ui>
                </div>
            `;
        
        // console.log(target.innerHTML);
        })
    }

    static makeStep1View(){
        View.makeDropDown("cpu","Brand",config.step1, "cpuBrandBtn");
        View.makeDropDown("cpu","Model",config.step1, "cpuModelBtn");
    }

    static makeStep2View(){
        View.makeDropDown("gpu","Brand",config.step2, "gpuBrandBtn");
        View.makeDropDown("gpu","Model",config.step2, "gpuModelBtn");
    }

    // static makeStep2View(){
    //     let modelCheck = [];
    //     let step2HTML = "";
    //     let brandName = document.getElementById("step1Btn").innerHTML;
    //     for (let i = 0; i < camera.length; i++){
    //         if (modelCheck.indexOf(camera[i].model) === -1 && brandName === camera[i][item]){
    //             modelCheck.push(camera[i].model);
    //             step2HTML += `
    //                 <li><button class="dropdown-item" type="button" id="${camera[i].model}" onclick="Control.displayModel('${camera[i].model}')">${camera[i].model}</button></li>`;
    //         }
    //     }

    //     config.step2.innerHTML = `
    //         <p class="font-step">step2: Select your GPU</p>
    //         <div class="row m-0">
    //             <p class="mr-3 font-item">Brand</p>
    //             <div class="dropdown mb-3">
    //                 <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     項目を選択してください
    //                 </button>
    //                 <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
    //                     ${step2HTML}
    //                 </ui>
    //             </div>
                
    //             <p class="mx-3 font-item">Model</p>
    //             <div class="dropdown mb-3">
    //                 <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     項目を選択してください
    //                 </button>
    //                 <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
    //                     ${step2HTML}
    //                 </ui>
    //             </div>
    //         </div>
    //         `
    //     config.step2.classList.add("ml-3");
    //     // console.log(brandName);
    // }

    static makeStep3View(){

        config.step3.innerHTML = `
            <p class="font-step">step3: Select Your Memory Card</p>
            <div class="row m-0">
                <p class="mr-3 font-item">How Many?</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>

                <p class="mx-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>
                
                <p class="mx-3 font-item">Model</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>
            </div>
        `
        let inputStep3 = document.getElementById("accessoryPowerConsumption");
        // inputStep3.addEventListener("keydown", function(event){
        //     if (event.key === "Enter"){
        //         Control.limitOfStep3();
        //         document.activeElement.blur();
        //         // console.log("done inputStep3");
        //     }
        // });
        config.step3.classList.add("ml-3");
    }

    static makeStep4View(){

        config.step4.innerHTML = `
            <p class="font-step">step4: Select Your Storage</p>
            <div class="row m-0">
                <p class="mr-3 font-item">HDD or SSD?</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        HDD or SSD
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>

                <p class="mx-3 font-item">Storage</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>

                <p class="mx-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>
                
                <p class="mx-3 font-item">Model</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        {step2HTML}
                    </ui>
                </div>
            </div>
        `
        let inputStep3 = document.getElementById("accessoryPowerConsumption");
        // inputStep3.addEventListener("keydown", function(event){
        //     if (event.key === "Enter"){
        //         Control.limitOfStep3();
        //         document.activeElement.blur();
        //         // console.log("done inputStep3");
        //     }
        // });
        config.step4.classList.add("ml-3");
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
    static displayBrand(brand, btnId){
        let brandName = document.getElementById(btnId);
        brandName.innerHTML = brand;
        // console.log(brand);
        // View.makeStep2View();
    }

    static displayModel(model){
        let brandName = document.getElementById("step2Btn");
        brandName.innerHTML = model;
        // console.log(brand);
        Control.screening();
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
                <div id="step3">
                </div>
            </div>
            <div class="row">
                <div id="step4">
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
// View.makeStep3View();
// View.makeStep4View();