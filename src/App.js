import './App.css';
import { InputNumber } from 'primereact/inputnumber';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from "react";

function App() {
    const initialState = {
        TotalDaysofMonth: 0,
        PaidLeavesTaken: 0,
        UnpaidLeavesTaken: 0,
        TotalDaysToBePaid: 0,
        CTC: 0,
        CurrentMonthCTC: 0,
        BasicSalary: 0,
        DA: 0,
        HRA: 0,
        Conveyance: 600,
        Variable: 0,
        Bonus: 0,
        Total: 0,
        ProfessionalTax: 0,
        TDS: 0,
        TotalDeduction: 0,
        NetPayable: 0,
        OtherAllowance: 0,
    }
    const [state, setState] = useState(initialState);

    const handleChangeTotalDaysOfMonth = (value) => {
        const updatedTotalDaysToBePaid = value - state.PaidLeavesTaken - state.UnpaidLeavesTaken;
        setState({
            ...state,
            TotalDaysofMonth: value,
            TotalDaysToBePaid: updatedTotalDaysToBePaid
        });
    }

    const handleChange = (value, name) => {
        let updatedPaidLeavesTaken = state.PaidLeavesTaken;
        let updatedUnpaidLeavesTaken = state.UnpaidLeavesTaken;
        let updatedCTC = state.CTC;
        let updatedConveyance = state.Conveyance;
        let updatedVariable = state.Variable;
        let updatedBonus = state.Bonus;
        let updatedTDS = state.TDS;

        if (name === 'PaidLeavesTaken') {
            updatedPaidLeavesTaken = value;
        } else if (name === 'UnpaidLeavesTaken') {
            updatedUnpaidLeavesTaken = value;
        } else if (name === 'CTC') {
            updatedCTC = value;
        } else if (name === 'Conveyance') {
            updatedConveyance = value;
        } else if (name === 'Variable') {
            updatedVariable = value;
        } else if (name === 'Bonus') {
            updatedBonus = value;
        } else if (name === 'TDS') {
            updatedTDS = value;
        }

        const updatedTotalDaysToBePaid = state.TotalDaysofMonth - updatedUnpaidLeavesTaken;
        const newCurrentCTC = Math.round((updatedTotalDaysToBePaid / state.TotalDaysofMonth) * updatedCTC);
        const newbasicSalary = Math.round(newCurrentCTC * (40 / 100));
        const newDA = Math.round((newbasicSalary) * (40 / 100));
        const newHRA = Math.round((newbasicSalary + newDA) * (40 / 100));
        const newotherAllowance = newCurrentCTC - newbasicSalary - newDA - newHRA - updatedConveyance;
        const newtotal = newbasicSalary + newDA + newHRA + updatedConveyance + newotherAllowance + updatedVariable + updatedBonus;

        const calculateProfessionalTax = (newtotal) => {
            if (newtotal > 11999)
                return 200;
            else if (newtotal > 8999)
                return 150;
            else if (newtotal > 5999)
                return 80;
            else
                return 0;
        };
        const newprofessionalTax = calculateProfessionalTax(newtotal);
        const newtotalDeduction = (newprofessionalTax + updatedTDS);
        const newnetPayable = (newtotal - newtotalDeduction);

        setState({
            ...state,
            PaidLeavesTaken: updatedPaidLeavesTaken,
            UnpaidLeavesTaken: updatedUnpaidLeavesTaken,
            TotalDaysToBePaid: updatedTotalDaysToBePaid,
            CTC: updatedCTC,
            CurrentMonthCTC: newCurrentCTC,
            BasicSalary: newbasicSalary,
            DA: newDA,
            HRA: newHRA,
            Conveyance: updatedConveyance,
            OtherAllowance: newotherAllowance,
            Variable: updatedVariable,
            Bonus: updatedBonus,
            Total: newtotal,
            ProfessionalTax: newprofessionalTax,
            TDS: updatedTDS,
            TotalDeduction: newtotalDeduction,
            NetPayable: newnetPayable,
        });
    }

    console.log("State", state)
    return (
        <div className="App">
            <h1>Salary Filed Logic</h1>
            <div className=''>
                <div className="lg:col-12 md:col-12 col-12">
                    <label className='label'>Total Days of Month </label>
                    <InputNumber type='text' className='inputbox' value={state.TotalDaysofMonth} onChange={(e) => handleChangeTotalDaysOfMonth(e.value)} />
                </div>
            </div>

            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Paid Leaves Taken </label>
                <InputNumber className='inputbox' name='PaidLeavesTaken' value={state.PaidLeavesTaken} onChange={(e) => handleChange(e.value, 'PaidLeavesTaken')} defaultValue={0} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Unpaid Leaves Taken </label>
                <InputNumber className='inputbox' name='UnpaidLeavesTaken' value={state.UnpaidLeavesTaken} onChange={(e) => handleChange(e.value, 'UnpaidLeavesTaken')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Total Days To Be Paid </label>
                <InputNumber className='inputbox' name='TotalDaysToBePaid' value={state.TotalDaysToBePaid} readOnly />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
                <label className='label'>CTC </label>
                <InputNumber className='inputbox' name='CTC' value={state.CTC} onChange={(e) => handleChange(e.value, 'CTC')} />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
                <label className='label'>Current Month CTC </label>
                <InputNumber className='inputbox' name='CurrentMonthCTC' value={state.CurrentMonthCTC} defaultValue={0} readOnly />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Basic Salary </label>
                <InputNumber className="inputbox" name="BasicSalary" value={state.BasicSalary} defaultValue={0} onChange={(e) => handleChange(e.value, 'BasicSalary')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>DA </label>
                <InputNumber className="inputbox" name="DA" value={state.DA} onChange={(e) => handleChange(e.value, 'DA')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>HRA </label>
                <InputNumber className='inputbox' name='HRA' value={state.HRA} onChange={(e) => handleChange(e.value, 'HRA')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Conveyance </label>
                <InputNumber className='inputbox' name='Conveyance' value={state.Conveyance} onChange={(e) => handleChange(e.value, 'Conveyance')} defaultValue={600} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Other Allowance </label>
                <InputNumber className='inputbox' name='OtherAllowance' value={state.OtherAllowance || 0} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Variable </label>
                <InputNumber className='inputbox' name='Variable' value={state.Variable} onChange={(e) => handleChange(e.value, 'Variable')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Bonus </label>
                <InputNumber className='inputbox' name='Bonus' value={state.Bonus} onChange={(e) => handleChange(e.value, 'Bonus')} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Total </label>
                <InputNumber className='inputbox' name='Total' value={state.Total || 0} />
            </div>
            <div className="lg:col-4 md:col-6 col-12">
                <label className='label'>Professional Tax </label>
                <InputNumber className='inputbox' name='ProfessionalTax' value={state.ProfessionalTax} />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
                <label className='label'>TDS </label>
                <InputNumber className='inputbox' name='TDS' value={state.TDS} />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
                <label className='label'>Total Deduction </label>
                <InputNumber className='inputbox' name='TotalDeduction' value={state.TotalDeduction} />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
                <label className='label'>Net Payable </label>
                <InputNumber className='inputbox' name='NetPayable' value={state.NetPayable} />
            </div>
        </div>
    );
}

export default App;
