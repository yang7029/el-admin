import { reactive, onMounted, onBeforeUnmount } from 'vue';

function savePoint() {
	// 实现鼠标打点功能
	let point = reactive({
		x: 0,
		y: 0,
	});
	function savePoint(event) {
		point.x = event.pageX;
		point.y = event.pageY;
		console.log(point.x, point.y);
	}
	onMounted(() => {
		window.addEventListener('click', savePoint);
	});
	onBeforeUnmount(() => {
		window.removeEventListener('click', savePoint);
	});
	return point;
}
export default savePoint;
