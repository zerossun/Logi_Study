import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Paginated } from './paging';

export const ApiOkResponsePaginated = <T extends Type<unknown>>(item: T) => {
  return applyDecorators(
    ApiExtraModels(Paginated, item),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Paginated) },
          {
            properties: {
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(item) },
              },
            },
          },
        ],
      },
    }),
  );
};
