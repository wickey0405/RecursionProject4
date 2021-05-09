// ここから書いてください。
initializeApp();

const config = {
    title : document.getElementById("title"),
    step1 : document.getElementById("step1"),
    step2 : document.getElementById("step2"),
    step3 : document.getElementById("step3"),
    step4 : document.getElementById("step4"),
    result : document.getElementById("result")
}

const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// console.log(battery);
// console.log(camera);

class View{
    static makeTitle(){
        config.title.innerHTML = `
            <h1 class="text-center text-white">Build Your Own PC</h1>
        `
        config.title.classList.add("col-12", "p-3", "bg-secondary");
    }

    static makeStep1View(){
        let brandCheck = [];
        let step1HTML = "";
        for (let i = 0; i < camera.length; i++){
            if (brandCheck.indexOf(camera[i].brand) === -1 ){
                brandCheck.push(camera[i].brand);
                step1HTML += `
                    <li><button class="dropdown-item" type="button" id="${camera[i].brand}" onclick="Control.displayBrand('${camera[i].brand}')">${camera[i].brand}</button></li>`;
            }
        }

        config.step1.innerHTML = `
            <p class="text-start font-step">step1: Select your CPU</p>
            <div class="row m-0">
                <p class="mr-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id="step1Btn" role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step1Btn">
                        ${step1HTML}
                    </ui>
                </div>

                <p class="mx-3 font-item">Model</p>
                <div class="dropdown mb-3">
                    <button id="step1Btn" role="button" class="btn btn-dark border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step1Btn">
                        ${step1HTML}
                    </ui>
                </div>
            </div>`;
        
        config.step1.classList.add("ml-3");
        // console.log(config.step1.innerHTML);
    }

    static makeStep2View(){
        let modelCheck = [];
        let step2HTML = "";
        let brandName = document.getElementById("step1Btn").innerHTML;
        for (let i = 0; i < camera.length; i++){
            if (modelCheck.indexOf(camera[i].model) === -1 && brandName === camera[i].brand){
                modelCheck.push(camera[i].model);
                step2HTML += `
                    <li><button class="dropdown-item" type="button" id="${camera[i].model}" onclick="Control.displayModel('${camera[i].model}')">${camera[i].model}</button></li>`;
            }
        }

        config.step2.innerHTML = `
            <p class="font-step">step2: Select your GPU</p>
            <div class="row m-0">
                <p class="mr-3 font-item">Brand</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        ${step2HTML}
                    </ui>
                </div>
                
                <p class="mx-3 font-item">Model</p>
                <div class="dropdown mb-3">
                    <button id="step2Btn" role="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        項目を選択してください
                    </button>
                    <ui id="step1List" class="dropdown-menu" aria-labelledby="step2Btn">
                        ${step2HTML}
                    </ui>
                </div>
            </div>
            `
        config.step2.classList.add("ml-3");
        // console.log(brandName);
    }

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
    static displayBrand(brand){
        let brandName = document.getElementById("step1Btn");
        brandName.innerHTML = brand;
        // console.log(brand);
        View.makeStep2View();
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
            if (selectedBrand === camera[i].brand && selectedModel === camera[i].model){
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
                <div id="step1">
                </div>
            </div>
            <div class="row">
                <div id="step2">
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
View.makeStep3View();
View.makeStep4View();