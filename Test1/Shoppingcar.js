document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const storeItems = document.getElementById("store-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout");

    // 商品数据示例
    //const products = [
    //    { id: 1, name: "商品1", price: 10 },
    //    { id: 2, name: "商品2", price: 20 },
    //    { id: 3, name: "商品3", price: 30 },
    //];

    // 初始化购物车
    const cart = [];

    // 更新购物车
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        for (const item of cart) {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
            total += item.price;
        }
        cartTotal.textContent = `总计: $${total}`;
    }

    // 添加商品到购物车
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
        }
    }

    // 显示可购买的商品列表
    for (const product of products) {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        const button = document.createElement("button");
        button.textContent = "加入购物车";
        button.addEventListener("click", () => addToCart(product.id));
        li.appendChild(button);
        storeItems.appendChild(li);
    }

    // 结账按钮点击事件
    checkoutButton.addEventListener("click", () => {
        // 这里可以编写结账逻辑，例如生成订单，处理支付等
        alert("感谢您的购物！订单已提交。");
        cart.length = 0; // 清空购物车
        updateCart();
    });
});
