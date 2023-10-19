import SelectCustom, { selectItemType } from '@/components/Forms/SelectCustom'
import React from 'react'
import { OrderStatusOptions } from '../utils/orderConst';

type Props = {
    error: any;
    editPage?: boolean;
    selectedStatus: selectItemType | undefined;
    setSelectedStatus: (selectedStatus: selectItemType | undefined) => void;
}

const BookingForm = ({ selectedStatus, error, setSelectedStatus }: Props) => {
    return (
        <div>
            <SelectCustom
                value={selectedStatus}
                defaultValue={selectedStatus}
                onChange={(option: selectItemType) => setSelectedStatus(option)}
                options={OrderStatusOptions}
                label='Select Location'
                placeHolder='Select Location'
                required
                error={error.status}
                isSearchable
            />
        </div>
    )
}

export default BookingForm