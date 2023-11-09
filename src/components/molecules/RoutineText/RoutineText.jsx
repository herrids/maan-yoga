import { useTranslation } from 'react-i18next';

export default function ({value, index, handleChange, handleRemoval}) {
    const { t } = useTranslation();
    
    return (
        <div className="pose-text">
            <textarea 
                className="pose-text-input" 
                name="text"
                placeholder={t("enterText")}
                value={value} 
                onChange={(event) => handleChange(event, index)}
            />
            <button className="remove-pose" onClick={() => handleRemoval(index)}>
                {t("delete")}
            </button>
        </div>
    )
}