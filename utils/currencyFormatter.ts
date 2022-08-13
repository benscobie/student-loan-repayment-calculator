const getInstance = () => {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    });
}

export default function currencyFormatter() {
    return getInstance()
}