import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { addRoomLink, roomsLink } from '@/configs/constants'
import React from 'react'

type Props = {}

const AddRoom = (props: Props) => {
    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Rooms',
                        url: roomsLink,
                    },
                    {
                        title: 'Add Room',
                        url: addRoomLink,
                    },
                ]}
            />
        </>
    )
}

export default AddRoom