import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";

function App() {
  const handleValidation = (values) => {
    if (!values.parserName) {
      return { parserName: "Please enter Parser Name" };
    }
    if (values.parserType.length <= 0) {
      return { parserType: "Please enter Parser Type" };
    }
    if (!values.weight) {
      return { weight: "Please enter Weight" };
    }

    // enqueueSnackbar(response.error.data[0].message, { variant: 'error' });
    const expressions = values.barcodeExpression;
    const expressionErrors = [];
    for (let i = 0; i < expressions.length; i++) {
      const expression = expressions[i];
      const barcodeFields = expression.barcodeField;
      const error = {
        barcodeField: [],
      };

      for (let j = 0; j < barcodeFields.length; j++) {
        const barcodeField = barcodeFields[j];
        const segments = barcodeField.barcodeSegment;
        const fieldError = {
          segments: [],
        };

        if (segments.length === 0) {
          fieldError.segments.push(
            "Please add expression for all the segments"
          );
          error.barcodeField.push(fieldError.segments);
          expressionErrors.push(error);
          return {
            barcodeExpression: expressionErrors,
          };
        }

        for (let q = 0; q < segments.length; q++) {
          const segment = segments[q];
          let segmentError = "";
          if (!segment.expression || !barcodeField.type.id) {
            segmentError = "Please add expression for all the segments";
            fieldError.segments.push(segmentError);
            error.barcodeField.push(fieldError.segments);
            expressionErrors.push(error);
            return {
              barcodeExpression: expressionErrors,
            };
          } else {
            fieldError.segments.push(segmentError);
          }
        }
        error.barcodeField.push(fieldError.segments);
      }
      expressionErrors.push(error.barcodeField);
    }
    return {};
  };

  const result = {
    parserName: "Parser 456",
    parserType: [
      {
        id: 7,
        name: "Location",
      },
      {
        id: 6,
        name: "Inventory",
      },
    ],
    weight: "100",
    barcodeExpression: [
      {
        expression: "^.{1,3}.{7,9}.{8,9}[ ]*$",
        barcodeField: [
          {
            type: {
              id: 8,
              name: "Non Field",
            },
            expression: "",
            position: 1,
            barcodeSegment: [
              {
                segmentType: {
                  id: 2,
                  name: "Any",
                },
                action: "edit",
                position: 1,
                expression: ".{1,3}",
                newAction: "save",
                min: "1",
                max: "3",
              },
              {
                segmentType: {
                  id: 2,
                  name: "Any",
                },
                action: "edit",
                position: 2,
                expression: ".{7,9}",
                newAction: "save",
                min: "7",
                max: "9",
              },
            ],
          },
          {
            type: {
              id: 1,
              name: "Test 2",
            },
            expression: "",
            position: 2,
            barcodeSegment: [
              {
                segmentType: {
                  id: 2,
                  name: "Any",
                },
                action: "edit",
                position: 1,
                expression: ".{8,9}",
                newAction: "save",
                min: "8",
                max: "9",
              },
              {
                segmentType: {
                  id: 2,
                  name: "Any",
                },
                action: "save",
              },
            ],
          },
        ],
      },
    ],
  };

  console.log(handleValidation(result));

  return <div></div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
