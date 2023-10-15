import { inputCmnClass } from '@components/Forms/Input';
import React, { InputHTMLAttributes } from 'react'
import { cx } from 'src/hooks/helper';

type Props = {
    searchText: string;
    setSearchText: (searchText: string) => void;
} & InputHTMLAttributes<HTMLInputElement>

const SearchBox = ({ searchText, setSearchText, ...props }: Props) => {
    return (
        <div>
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={cx(
                    inputCmnClass,
                )}
                {...props}
            />
        </div>
    )
}

export default SearchBox