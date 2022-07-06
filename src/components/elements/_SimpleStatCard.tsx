import React from 'react'

import { Card } from '@elements'

import styles from './SimpleStatCard.module.scss'

type Props = {
    title: string
    value: string
    icon: string
    growth?: {
        value: number
        unit: string
        text?: string
    }
}

export const SimpleStatCard: React.FC<Props> = ({ title, value, icon, growth }) => {

	return (<>
        <Card>
            
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.value}>{value}</div>

            {growth && (
                <div className={styles.growth}>
                    <div className={`${styles.growth__value} ${styles[growth.value < 0 ? 'decrease' : 'increase']}`}>
                        {growth.value < 0 ? '-' : '+'}{growth.value}{growth.unit}
                    </div>
                    {growth.text && <div className={styles.growth__text}>{growth.text}</div>}
                </div>
            )}
        </Card>
    </>)
}