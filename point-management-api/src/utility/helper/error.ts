function convertError(error: unknown): string {
  if (error instanceof Error) {
    const { message } = error;

    // Check if the error is about an unknown argument
    if (message.includes('Unknown argument')) {
      const unknownArgumentMatch = message.match(/Unknown argument `(.*?)`/);
      const availableArgsMatch = message.match(/Available options are marked with \?/);

      if (unknownArgumentMatch) {
        const unknownArgument = unknownArgumentMatch[1];

        let suggestionMessage = `The argument "${unknownArgument}" is not recognized. `;

        // Extract available options for more context
        if (availableArgsMatch) {
          suggestionMessage += 'Please review the available options in the schema or update the field name to match the schema definition.';
        }

        return suggestionMessage;
      }
    }
  }

  // If the error doesn't match, return a generic error message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return `An unexpected error occurred: ${(error as { message: string }).message}`;
  }
  return 'An unexpected error occurred.';
}

export default {
  convertError,
};
