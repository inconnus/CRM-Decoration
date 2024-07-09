import { useFormContext, useFormState } from 'react-hook-form'
import styles from './index.module.sass'
import { DecorationParams } from '@/types/DecorationParams'
import { Column } from '@/ui'

const Gender = (params: DecorationParams) => {
    const { register } = params.form
    return (
        <Column sx={{...params?.styles}} className={styles.gender}>
            <span className={styles.title}>เลือกเพศของท่าน</span>
            <div className={styles.btns}>
                <label   >
                    <input type='radio' value={'M'}  {...register(`gender`)} />
                    <div className={`${styles.content} ${styles.male}`}>
                        <i className={`fas fa-mars`}></i>
                        <span>ชาย</span>

                    </div>
                </label>
                <label  >
                    <input type='radio' value={'F'}  {...register(`gender`)} />
                    <div className={`${styles.content} ${styles.female}`}>
                        <i className={`fas fa-venus`}></i>
                        <span>หญิง</span>
                    </div>
                </label>
            </div>
        </Column>

    )
}

export default Gender