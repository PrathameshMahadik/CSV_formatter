import React from "react"; 
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundry";

// Helper component to simulate an error
const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
  test("renders child component without error", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  test("catches error and displays fallback UI", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Ooops!")).toBeInTheDocument();
    expect(
      screen.getByText("THIS PAGE DOESN'T EXIST OR UNAVAILABLE")
    ).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

//   test("resets error state on link click", () => {
//     render(
//       <MemoryRouter initialEntries={["/error", "/about"]}>
//         <Routes>
//           <Route path="/about" element={<div>About Page</div>} />
//           <Route
//             path="/error"
//             element={
//               <ErrorBoundary>
//                 <ProblemChild />
//               </ErrorBoundary>
//             }
//           />
//         </Routes>
//       </MemoryRouter>
//     );
//     fireEvent.click(screen.getByText("Go Back"));

//     expect(screen.getByText("About Page")).toBeInTheDocument();
//   });
});
