 document.addEventListener('DOMContentLoaded', function() {
            
            const AVG_TARIFF_DOMESTIC = 45; // LKR per kWh (average domestic rate)
            const AVG_TARIFF_GENERAL = 55;  // LKR per kWh (average general/commercial rate)
            const MONTHLY_GENERATION_PER_KWP = 120; // kWh/month per kWp (Sri Lanka average)
            
            const billInput = document.getElementById('billAmount');
            const solarPowerOutput = document.getElementById('solarPower');
            const monthlyUnitsOutput = document.getElementById('monthlyUnits');
            const domesticBtn = document.getElementById('domesticBtn');
            const generalBtn = document.getElementById('generalBtn');
            
            let currentTariff = AVG_TARIFF_DOMESTIC;
            let isDomestic = true;
            
            // Event listeners
            billInput.addEventListener('input', calculateSolar);
            domesticBtn.addEventListener('click', () => {
                isDomestic = true;
                currentTariff = AVG_TARIFF_DOMESTIC;
                domesticBtn.classList.add('active');
                generalBtn.classList.remove('active');
                calculateSolar();
            });
            generalBtn.addEventListener('click', () => {
                isDomestic = false;
                currentTariff = AVG_TARIFF_GENERAL;
                generalBtn.classList.add('active');
                domesticBtn.classList.remove('active');
                calculateSolar();
            });
            
            // Initial calculation
            calculateSolar();
            function calculateSolar() { 
                const billAmount = parseFloat(billInput.value) || 0;
                
                // Calculate monthly kWh usage
                const monthlyKwh = billAmount / currentTariff;
                
                // Calculate required kWp (monthly kWh / monthly generation per kWp)
                const kwpNeeded = monthlyKwh / MONTHLY_GENERATION_PER_KWP;
                
               
                
                // Update UI
                solarPowerOutput.textContent = kwpNeeded.toFixed(2) + ' KWp';
                monthlyUnitsOutput.textContent = (kwpNeeded * MONTHLY_GENERATION_PER_KWP).toFixed(2);
                systemCostOutput.textContent = 'Rs ' + systemCost.toLocaleString('en-US', {maximumFractionDigits: 0});
            }
        });