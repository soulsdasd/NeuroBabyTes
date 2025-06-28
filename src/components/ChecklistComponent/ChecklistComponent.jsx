function ReflejosChecklist({ reflejos, setReflejos }) {

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setReflejos(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    return (
        <div>
            {Object.entries(reflejos).map(([key, value]) => (
                <label key={key} style={{ textTransform: "capitalize", display: "block", margin: "6px 0", fontSize: "20px" }}>
                    <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={handleChange}
                        style={{transform: "scale(1.4)", marginRight: '8px'}}
                    />
                    {key.replace(/_/g, " ")}
                </label>
            ))}
        </div>
    );
}

export default ReflejosChecklist;

