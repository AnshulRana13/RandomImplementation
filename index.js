function myFunction() {
  var paymentMethodsResponse = {
    groups: [
      {
        name: "Credit Card",
        types: ["mc", "visa", "amex", "maestro", "diners", "discover"],
      },
      {
        name: "WeChatPay",
        types: ["wechatpayQR", "wechatpayWeb"],
      },
      {
        name: "AliPay",
        types: ["alipay"],
      },
    ],
    paymentMethods: [
      {
        details: [
          {
            items: [
              {
                id: "1121",
                name: "Test Issuer",
              },
              {
                id: "1154",
                name: "Test Issuer 5",
              },
              {
                id: "1153",
                name: "Test Issuer 4",
              },
              {
                id: "1152",
                name: "Test Issuer 3",
              },
              {
                id: "1151",
                name: "Test Issuer 2",
              },
              {
                id: "1162",
                name: "Test Issuer Cancelled",
              },
              {
                id: "1161",
                name: "Test Issuer Pending",
              },
              {
                id: "1160",
                name: "Test Issuer Refused",
              },
              {
                id: "1159",
                name: "Test Issuer 10",
              },
              {
                id: "1158",
                name: "Test Issuer 9",
              },
              {
                id: "1157",
                name: "Test Issuer 8",
              },
              {
                id: "1156",
                name: "Test Issuer 7",
              },
              {
                id: "1155",
                name: "Test Issuer 6",
              },
            ],
            key: "issuer",
            type: "select",
          },
        ],
        name: "iDEAL",
        supportsRecurring: true,
        type: "ideal",
      },
      {
        brands: ["mc", "visa", "amex", "maestro", "diners", "discover"],
        details: [
          {
            key: "encryptedCardNumber",
            type: "cardToken",
          },
          {
            key: "encryptedSecurityCode",
            type: "cardToken",
          },
          {
            key: "encryptedExpiryMonth",
            type: "cardToken",
          },
          {
            key: "encryptedExpiryYear",
            type: "cardToken",
          },
          {
            key: "holderName",
            optional: true,
            type: "text",
          },
        ],
        name: "Credit Card",
        type: "scheme",
      },
      {
        details: [
          {
            key: "sepa.ownerName",
            type: "text",
          },
          {
            key: "sepa.ibanNumber",
            type: "text",
          },
        ],
        name: "SEPA Direct Debit",
        supportsRecurring: true,
        type: "sepadirectdebit",
      },
      {
        name: "AliPay",
        supportsRecurring: true,
        type: "alipay",
      },
      {
        name: "WeChat Pay",
        supportsRecurring: true,
        type: "wechatpayQR",
      },
      {
        name: "WeChat Pay",
        supportsRecurring: true,
        type: "wechatpayWeb",
      },
    ],
  };
  const configuration = {
    paymentMethodsResponse: paymentMethodsResponse, // The `/paymentMethods` response from the server.
    clientKey: "test_CIXAPNBW2JERLEJ6GYYC3WBLVMO2HIZ3", // Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
    locale: "en-US",
    environment: "test",
    onSubmit: (state, dropin) => {
      // Your function calling your server to make the `/payments` request
      makePayment(state.data)
        .then((response) => {
          if (response.action) {
            // Drop-in handles the action object from the /payments response
            dropin.handleAction(response.action);
          } else {
            // Your function to show the final result to the shopper
            showFinalResult(response);
          }
        })
        .catch((error) => {
          throw Error(error);
        });
    },
    onAdditionalDetails: (state, dropin) => {
      // Your function calling your server to make a `/payments/details` request
      makeDetailsCall(state.data)
        .then((response) => {
          if (response.action) {
            // Drop-in handles the action object from the /payments response
            dropin.handleAction(response.action);
          } else {
            // Your function to show the final result to the shopper
            showFinalResult(response);
          }
        })
        .catch((error) => {
          throw Error(error);
        });
    },
    paymentMethodsConfiguration: {
      card: {
        // Example optional configuration for Cards
        hasHolderName: true,
        holderNameRequired: true,
        enableStoreDetails: true,
        hideCVC: false, // Change this to true to hide the CVC field for stored cards
        name: "Credit or debit card",
      },
    },
  };

  const checkout = new AdyenCheckout(configuration);
  const dropin = checkout.create("dropin").mount("#dropin-container");
}
myFunction();

//console.log("Hello World")
// const newCar = {
//     name: 'Maruti',
//     model: '1998'
// }

// function CreateCar(name, model) {
//     this.name = name;
//     this.model = model;
//     this.print = function () {
//         console.log(this.name + " has the model " + this.model);
//         return this.name;
//     }
// }

// CreateCar.prototype.model = "1984";

// let car = new CreateCar("Ford", "1989");
// console.log(car.model);
//car.print.apply(newCar);

//CreateCar("ass", "nn").print();

//CreateCar.apply()
//console.log(car.print());

//console.log(typeof (car.print));

// let animal = {
//     eats: true,
//     walk() {
//         alert("Animal walk");
//     }
// };

// let rabbit = {
//     jumps: true,
//     __proto__: animal
// }

// let longEar = {
//     earLength: 10,
//     __proto__: rabbit
// };

// //rabbit.__proto__ = animal;
// console.log(rabbit.eats);
// console.log(rabbit.jumps);
// rabbit.walk();
// ("use strict");
// console.log(this);

// function PrintThis() {
//   console.log(this);
// }

// PrintThis();

// const book = {
//   title: "Brave new World",
//   author: "Aldous Huxely",
// };

// function summary() {
//   console.log(`${this.title} was written by ${this.author}.`);
// }

// //summary();
// summary.call(book);
// summary.apply(book);
