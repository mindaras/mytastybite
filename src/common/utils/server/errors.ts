import { NextResponse } from "next/server";

interface ErrorProps {
  message?: string;
}

const error = ({ message }: ErrorProps) => {
  return {
    data: {
      error: {
        message: message,
      },
    },
  };
};

interface ErrorResponseProps extends ErrorProps {
  status?: number;
}

const errorResponse = ({ message, status }: ErrorResponseProps) => {
  return NextResponse.json(error({ message }), { status: status });
};

const error400Response = (
  { message }: ErrorResponseProps = { message: "Invalid input" }
) => {
  return NextResponse.json(error({ message }), { status: 400 });
};

const error404Response = (
  { message }: ErrorResponseProps = { message: "Resource not found" }
) => {
  return NextResponse.json(error({ message }), { status: 404 });
};

const error500Response = (
  { message }: ErrorResponseProps = { message: "Internal server error" }
) => {
  return NextResponse.json(error({ message }), { status: 500 });
};

export { errorResponse, error400Response, error404Response, error500Response };
