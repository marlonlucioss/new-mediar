import * as React from "react"
import { SVGProps } from "react"
const SuccessIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={156}
    height={156}
    fill="none"
    {...props}
  >
    <circle cx={78} cy={78} r={78} fill="#11AFE4" />
    <circle cx={78} cy={78} r={61.977} fill="#fff" />
    <path
      fill="#11AFE4"
      stroke="#11AFE4"
      strokeWidth={4}
      d="M54.303 90.684c4.1 4.484 11.058 4.795 15.541.695l42.85-39.179a2.742 2.742 0 0 1 3.7 4.047l-49.849 45.578a7 7 0 0 1-9.89-.442L40.333 83.529a2.742 2.742 0 0 1 .173-3.873l-1.35-1.477 1.35 1.477a2.742 2.742 0 0 1 3.873.173l9.925 10.855Z"
    />
  </svg>
)
export default SuccessIcon