import styles from './test.module.scss';

type TestPropsType = {
	text: string;
};

const Test: React.FC<TestPropsType> = ({ text }) => {
	return (
		<>
			<p className={styles.test__text}>{text}</p>
		</>
	);
};

export default Test;
