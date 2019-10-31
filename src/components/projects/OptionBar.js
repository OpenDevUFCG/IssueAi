import React from 'react';

import type { SortFieldOption } from '../../lib/constants';
import { SortField } from '../../lib/constants';
import './OptionBar.css';

type OptionBarProps = {
    sort: SortFieldOption,
    onChange: SortFieldOption => void,
};

const OptionBar = ({ sort, onChange }: OptionBarProps) => {
    const handleSortChange = e => {
        onChange(e.target.value);
    };

    return (
        <div className="option-bar">
            <div className="sort-select">
                <span className="label">Ordenar por: </span>
                <select value={sort} onChange={handleSortChange}>
                    <option value={SortField.STARS_DESC}>
                        Estrelas - Decrescente
                    </option>
                    <option value={SortField.STARS_ASC}>
                        Estrelas - Crescente
                    </option>
                </select>
            </div>
        </div>
    );
};

export default OptionBar;
