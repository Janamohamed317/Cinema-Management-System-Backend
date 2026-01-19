
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Movie
 * 
 */
export type Movie = $Result.DefaultSelection<Prisma.$MoviePayload>
/**
 * Model Hall
 * 
 */
export type Hall = $Result.DefaultSelection<Prisma.$HallPayload>
/**
 * Model Screening
 * 
 */
export type Screening = $Result.DefaultSelection<Prisma.$ScreeningPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HALL_MANAGER: 'HALL_MANAGER',
  USER: 'USER',
  TICKETS_MANAGER: 'TICKETS_MANAGER',
  SNACKS_MANAGER: 'SNACKS_MANAGER',
  MOVIES_MANAGER: 'MOVIES_MANAGER',
  UNASSIGNED: 'UNASSIGNED'
};

export type Role = (typeof Role)[keyof typeof Role]


export const HallType: {
  REGULAR: 'REGULAR',
  VIP: 'VIP'
};

export type HallType = (typeof HallType)[keyof typeof HallType]


export const ScreenType: {
  TWO_D: 'TWO_D',
  THREE_D: 'THREE_D',
  IMAX: 'IMAX',
  SCREEN_X: 'SCREEN_X'
};

export type ScreenType = (typeof ScreenType)[keyof typeof ScreenType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type HallType = $Enums.HallType

export const HallType: typeof $Enums.HallType

export type ScreenType = $Enums.ScreenType

export const ScreenType: typeof $Enums.ScreenType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hall`: Exposes CRUD operations for the **Hall** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Halls
    * const halls = await prisma.hall.findMany()
    * ```
    */
  get hall(): Prisma.HallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.screening`: Exposes CRUD operations for the **Screening** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Screenings
    * const screenings = await prisma.screening.findMany()
    * ```
    */
  get screening(): Prisma.ScreeningDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Movie: 'Movie',
    Hall: 'Hall',
    Screening: 'Screening'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "movie" | "hall" | "screening"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Movie: {
        payload: Prisma.$MoviePayload<ExtArgs>
        fields: Prisma.MovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findFirst: {
            args: Prisma.MovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findMany: {
            args: Prisma.MovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          create: {
            args: Prisma.MovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          createMany: {
            args: Prisma.MovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          delete: {
            args: Prisma.MovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          update: {
            args: Prisma.MovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          deleteMany: {
            args: Prisma.MovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          upsert: {
            args: Prisma.MovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          aggregate: {
            args: Prisma.MovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovie>
          }
          groupBy: {
            args: Prisma.MovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieCountArgs<ExtArgs>
            result: $Utils.Optional<MovieCountAggregateOutputType> | number
          }
        }
      }
      Hall: {
        payload: Prisma.$HallPayload<ExtArgs>
        fields: Prisma.HallFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HallFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HallFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          findFirst: {
            args: Prisma.HallFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HallFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          findMany: {
            args: Prisma.HallFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>[]
          }
          create: {
            args: Prisma.HallCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          createMany: {
            args: Prisma.HallCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HallCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>[]
          }
          delete: {
            args: Prisma.HallDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          update: {
            args: Prisma.HallUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          deleteMany: {
            args: Prisma.HallDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HallUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HallUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>[]
          }
          upsert: {
            args: Prisma.HallUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HallPayload>
          }
          aggregate: {
            args: Prisma.HallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHall>
          }
          groupBy: {
            args: Prisma.HallGroupByArgs<ExtArgs>
            result: $Utils.Optional<HallGroupByOutputType>[]
          }
          count: {
            args: Prisma.HallCountArgs<ExtArgs>
            result: $Utils.Optional<HallCountAggregateOutputType> | number
          }
        }
      }
      Screening: {
        payload: Prisma.$ScreeningPayload<ExtArgs>
        fields: Prisma.ScreeningFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScreeningFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScreeningFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          findFirst: {
            args: Prisma.ScreeningFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScreeningFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          findMany: {
            args: Prisma.ScreeningFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          create: {
            args: Prisma.ScreeningCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          createMany: {
            args: Prisma.ScreeningCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScreeningCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          delete: {
            args: Prisma.ScreeningDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          update: {
            args: Prisma.ScreeningUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          deleteMany: {
            args: Prisma.ScreeningDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScreeningUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScreeningUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          upsert: {
            args: Prisma.ScreeningUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          aggregate: {
            args: Prisma.ScreeningAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScreening>
          }
          groupBy: {
            args: Prisma.ScreeningGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScreeningGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScreeningCountArgs<ExtArgs>
            result: $Utils.Optional<ScreeningCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    movie?: MovieOmit
    hall?: HallOmit
    screening?: ScreeningOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MovieCountOutputType
   */

  export type MovieCountOutputType = {
    screenings: number
  }

  export type MovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | MovieCountOutputTypeCountScreeningsArgs
  }

  // Custom InputTypes
  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieCountOutputType
     */
    select?: MovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountScreeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningWhereInput
  }


  /**
   * Count Type HallCountOutputType
   */

  export type HallCountOutputType = {
    screenings: number
  }

  export type HallCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | HallCountOutputTypeCountScreeningsArgs
  }

  // Custom InputTypes
  /**
   * HallCountOutputType without action
   */
  export type HallCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HallCountOutputType
     */
    select?: HallCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HallCountOutputType without action
   */
  export type HallCountOutputTypeCountScreeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    verified: boolean | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    verified: boolean | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    username: number
    password: number
    role: number
    verified: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    username?: true
    password?: true
    role?: true
    verified?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    username?: true
    password?: true
    role?: true
    verified?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    username?: true
    password?: true
    role?: true
    verified?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    email: string
    username: string
    password: string
    role: $Enums.Role
    verified: boolean
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    verified?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    verified?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    verified?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    verified?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "email" | "username" | "password" | "role" | "verified" | "deletedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      email: string
      username: string
      password: string
      role: $Enums.Role
      verified: boolean
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Movie
   */

  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    duration: number | null
  }

  export type MovieSumAggregateOutputType = {
    duration: number | null
  }

  export type MovieMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    duration: number | null
    deletedAt: Date | null
  }

  export type MovieMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    duration: number | null
    deletedAt: Date | null
  }

  export type MovieCountAggregateOutputType = {
    id: number
    createdAt: number
    name: number
    duration: number
    deletedAt: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    duration?: true
  }

  export type MovieSumAggregateInputType = {
    duration?: true
  }

  export type MovieMinAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    duration?: true
    deletedAt?: true
  }

  export type MovieMaxAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    duration?: true
    deletedAt?: true
  }

  export type MovieCountAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    duration?: true
    deletedAt?: true
    _all?: true
  }

  export type MovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movie to aggregate.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }




  export type MovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithAggregationInput | MovieOrderByWithAggregationInput[]
    by: MovieScalarFieldEnum[] | MovieScalarFieldEnum
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }

  export type MovieGroupByOutputType = {
    id: string
    createdAt: Date
    name: string
    duration: number
    deletedAt: Date | null
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      >
    >


  export type MovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    duration?: boolean
    deletedAt?: boolean
    screenings?: boolean | Movie$screeningsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    duration?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    duration?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectScalar = {
    id?: boolean
    createdAt?: boolean
    name?: boolean
    duration?: boolean
    deletedAt?: boolean
  }

  export type MovieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "name" | "duration" | "deletedAt", ExtArgs["result"]["movie"]>
  export type MovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | Movie$screeningsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MovieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movie"
    objects: {
      screenings: Prisma.$ScreeningPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      name: string
      duration: number
      deletedAt: Date | null
    }, ExtArgs["result"]["movie"]>
    composites: {}
  }

  type MovieGetPayload<S extends boolean | null | undefined | MovieDefaultArgs> = $Result.GetResult<Prisma.$MoviePayload, S>

  type MovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieCountAggregateInputType | true
    }

  export interface MovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movie'], meta: { name: 'Movie' } }
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieFindUniqueArgs>(args: SelectSubset<T, MovieFindUniqueArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieFindUniqueOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieFindFirstArgs>(args?: SelectSubset<T, MovieFindFirstArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieWithIdOnly = await prisma.movie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovieFindManyArgs>(args?: SelectSubset<T, MovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
     */
    create<T extends MovieCreateArgs>(args: SelectSubset<T, MovieCreateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movies.
     * @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieCreateManyArgs>(args?: SelectSubset<T, MovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movies and returns the data saved in the database.
     * @param {MovieCreateManyAndReturnArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
     */
    delete<T extends MovieDeleteArgs>(args: SelectSubset<T, MovieDeleteArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieUpdateArgs>(args: SelectSubset<T, MovieUpdateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDeleteManyArgs>(args?: SelectSubset<T, MovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieUpdateManyArgs>(args: SelectSubset<T, MovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies and returns the data updated in the database.
     * @param {MovieUpdateManyAndReturnArgs} args - Arguments to update many Movies.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
     */
    upsert<T extends MovieUpsertArgs>(args: SelectSubset<T, MovieUpsertArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): Prisma.PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movie model
   */
  readonly fields: MovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    screenings<T extends Movie$screeningsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$screeningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movie model
   */
  interface MovieFieldRefs {
    readonly id: FieldRef<"Movie", 'String'>
    readonly createdAt: FieldRef<"Movie", 'DateTime'>
    readonly name: FieldRef<"Movie", 'String'>
    readonly duration: FieldRef<"Movie", 'Int'>
    readonly deletedAt: FieldRef<"Movie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findUniqueOrThrow
   */
  export type MovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findFirstOrThrow
   */
  export type MovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findMany
   */
  export type MovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movies to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie create
   */
  export type MovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to create a Movie.
     */
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }

  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie createManyAndReturn
   */
  export type MovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie update
   */
  export type MovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to update a Movie.
     */
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie updateManyAndReturn
   */
  export type MovieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie upsert
   */
  export type MovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The filter to search for the Movie to update in case it exists.
     */
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     */
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }

  /**
   * Movie delete
   */
  export type MovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter which Movie to delete.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movies to delete
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to delete.
     */
    limit?: number
  }

  /**
   * Movie.screenings
   */
  export type Movie$screeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    where?: ScreeningWhereInput
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    cursor?: ScreeningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Movie without action
   */
  export type MovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
  }


  /**
   * Model Hall
   */

  export type AggregateHall = {
    _count: HallCountAggregateOutputType | null
    _avg: HallAvgAggregateOutputType | null
    _sum: HallSumAggregateOutputType | null
    _min: HallMinAggregateOutputType | null
    _max: HallMaxAggregateOutputType | null
  }

  export type HallAvgAggregateOutputType = {
    seats: number | null
  }

  export type HallSumAggregateOutputType = {
    seats: number | null
  }

  export type HallMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.HallType | null
    screenType: $Enums.ScreenType | null
    seats: number | null
    deletedAt: Date | null
  }

  export type HallMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.HallType | null
    screenType: $Enums.ScreenType | null
    seats: number | null
    deletedAt: Date | null
  }

  export type HallCountAggregateOutputType = {
    id: number
    name: number
    type: number
    screenType: number
    seats: number
    deletedAt: number
    _all: number
  }


  export type HallAvgAggregateInputType = {
    seats?: true
  }

  export type HallSumAggregateInputType = {
    seats?: true
  }

  export type HallMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    screenType?: true
    seats?: true
    deletedAt?: true
  }

  export type HallMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    screenType?: true
    seats?: true
    deletedAt?: true
  }

  export type HallCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    screenType?: true
    seats?: true
    deletedAt?: true
    _all?: true
  }

  export type HallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hall to aggregate.
     */
    where?: HallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Halls to fetch.
     */
    orderBy?: HallOrderByWithRelationInput | HallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Halls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Halls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Halls
    **/
    _count?: true | HallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HallAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HallSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HallMaxAggregateInputType
  }

  export type GetHallAggregateType<T extends HallAggregateArgs> = {
        [P in keyof T & keyof AggregateHall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHall[P]>
      : GetScalarType<T[P], AggregateHall[P]>
  }




  export type HallGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HallWhereInput
    orderBy?: HallOrderByWithAggregationInput | HallOrderByWithAggregationInput[]
    by: HallScalarFieldEnum[] | HallScalarFieldEnum
    having?: HallScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HallCountAggregateInputType | true
    _avg?: HallAvgAggregateInputType
    _sum?: HallSumAggregateInputType
    _min?: HallMinAggregateInputType
    _max?: HallMaxAggregateInputType
  }

  export type HallGroupByOutputType = {
    id: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt: Date | null
    _count: HallCountAggregateOutputType | null
    _avg: HallAvgAggregateOutputType | null
    _sum: HallSumAggregateOutputType | null
    _min: HallMinAggregateOutputType | null
    _max: HallMaxAggregateOutputType | null
  }

  type GetHallGroupByPayload<T extends HallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HallGroupByOutputType[P]>
            : GetScalarType<T[P], HallGroupByOutputType[P]>
        }
      >
    >


  export type HallSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    screenType?: boolean
    seats?: boolean
    deletedAt?: boolean
    screenings?: boolean | Hall$screeningsArgs<ExtArgs>
    _count?: boolean | HallCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hall"]>

  export type HallSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    screenType?: boolean
    seats?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["hall"]>

  export type HallSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    screenType?: boolean
    seats?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["hall"]>

  export type HallSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    screenType?: boolean
    seats?: boolean
    deletedAt?: boolean
  }

  export type HallOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "screenType" | "seats" | "deletedAt", ExtArgs["result"]["hall"]>
  export type HallInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | Hall$screeningsArgs<ExtArgs>
    _count?: boolean | HallCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HallIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HallIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HallPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hall"
    objects: {
      screenings: Prisma.$ScreeningPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.HallType
      screenType: $Enums.ScreenType
      seats: number
      deletedAt: Date | null
    }, ExtArgs["result"]["hall"]>
    composites: {}
  }

  type HallGetPayload<S extends boolean | null | undefined | HallDefaultArgs> = $Result.GetResult<Prisma.$HallPayload, S>

  type HallCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HallFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HallCountAggregateInputType | true
    }

  export interface HallDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hall'], meta: { name: 'Hall' } }
    /**
     * Find zero or one Hall that matches the filter.
     * @param {HallFindUniqueArgs} args - Arguments to find a Hall
     * @example
     * // Get one Hall
     * const hall = await prisma.hall.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HallFindUniqueArgs>(args: SelectSubset<T, HallFindUniqueArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hall that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HallFindUniqueOrThrowArgs} args - Arguments to find a Hall
     * @example
     * // Get one Hall
     * const hall = await prisma.hall.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HallFindUniqueOrThrowArgs>(args: SelectSubset<T, HallFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hall that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallFindFirstArgs} args - Arguments to find a Hall
     * @example
     * // Get one Hall
     * const hall = await prisma.hall.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HallFindFirstArgs>(args?: SelectSubset<T, HallFindFirstArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hall that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallFindFirstOrThrowArgs} args - Arguments to find a Hall
     * @example
     * // Get one Hall
     * const hall = await prisma.hall.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HallFindFirstOrThrowArgs>(args?: SelectSubset<T, HallFindFirstOrThrowArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Halls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Halls
     * const halls = await prisma.hall.findMany()
     * 
     * // Get first 10 Halls
     * const halls = await prisma.hall.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hallWithIdOnly = await prisma.hall.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HallFindManyArgs>(args?: SelectSubset<T, HallFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hall.
     * @param {HallCreateArgs} args - Arguments to create a Hall.
     * @example
     * // Create one Hall
     * const Hall = await prisma.hall.create({
     *   data: {
     *     // ... data to create a Hall
     *   }
     * })
     * 
     */
    create<T extends HallCreateArgs>(args: SelectSubset<T, HallCreateArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Halls.
     * @param {HallCreateManyArgs} args - Arguments to create many Halls.
     * @example
     * // Create many Halls
     * const hall = await prisma.hall.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HallCreateManyArgs>(args?: SelectSubset<T, HallCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Halls and returns the data saved in the database.
     * @param {HallCreateManyAndReturnArgs} args - Arguments to create many Halls.
     * @example
     * // Create many Halls
     * const hall = await prisma.hall.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Halls and only return the `id`
     * const hallWithIdOnly = await prisma.hall.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HallCreateManyAndReturnArgs>(args?: SelectSubset<T, HallCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hall.
     * @param {HallDeleteArgs} args - Arguments to delete one Hall.
     * @example
     * // Delete one Hall
     * const Hall = await prisma.hall.delete({
     *   where: {
     *     // ... filter to delete one Hall
     *   }
     * })
     * 
     */
    delete<T extends HallDeleteArgs>(args: SelectSubset<T, HallDeleteArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hall.
     * @param {HallUpdateArgs} args - Arguments to update one Hall.
     * @example
     * // Update one Hall
     * const hall = await prisma.hall.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HallUpdateArgs>(args: SelectSubset<T, HallUpdateArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Halls.
     * @param {HallDeleteManyArgs} args - Arguments to filter Halls to delete.
     * @example
     * // Delete a few Halls
     * const { count } = await prisma.hall.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HallDeleteManyArgs>(args?: SelectSubset<T, HallDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Halls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Halls
     * const hall = await prisma.hall.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HallUpdateManyArgs>(args: SelectSubset<T, HallUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Halls and returns the data updated in the database.
     * @param {HallUpdateManyAndReturnArgs} args - Arguments to update many Halls.
     * @example
     * // Update many Halls
     * const hall = await prisma.hall.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Halls and only return the `id`
     * const hallWithIdOnly = await prisma.hall.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HallUpdateManyAndReturnArgs>(args: SelectSubset<T, HallUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hall.
     * @param {HallUpsertArgs} args - Arguments to update or create a Hall.
     * @example
     * // Update or create a Hall
     * const hall = await prisma.hall.upsert({
     *   create: {
     *     // ... data to create a Hall
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hall we want to update
     *   }
     * })
     */
    upsert<T extends HallUpsertArgs>(args: SelectSubset<T, HallUpsertArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Halls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallCountArgs} args - Arguments to filter Halls to count.
     * @example
     * // Count the number of Halls
     * const count = await prisma.hall.count({
     *   where: {
     *     // ... the filter for the Halls we want to count
     *   }
     * })
    **/
    count<T extends HallCountArgs>(
      args?: Subset<T, HallCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HallAggregateArgs>(args: Subset<T, HallAggregateArgs>): Prisma.PrismaPromise<GetHallAggregateType<T>>

    /**
     * Group by Hall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HallGroupByArgs['orderBy'] }
        : { orderBy?: HallGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HallGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hall model
   */
  readonly fields: HallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hall.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HallClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    screenings<T extends Hall$screeningsArgs<ExtArgs> = {}>(args?: Subset<T, Hall$screeningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hall model
   */
  interface HallFieldRefs {
    readonly id: FieldRef<"Hall", 'String'>
    readonly name: FieldRef<"Hall", 'String'>
    readonly type: FieldRef<"Hall", 'HallType'>
    readonly screenType: FieldRef<"Hall", 'ScreenType'>
    readonly seats: FieldRef<"Hall", 'Int'>
    readonly deletedAt: FieldRef<"Hall", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Hall findUnique
   */
  export type HallFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter, which Hall to fetch.
     */
    where: HallWhereUniqueInput
  }

  /**
   * Hall findUniqueOrThrow
   */
  export type HallFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter, which Hall to fetch.
     */
    where: HallWhereUniqueInput
  }

  /**
   * Hall findFirst
   */
  export type HallFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter, which Hall to fetch.
     */
    where?: HallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Halls to fetch.
     */
    orderBy?: HallOrderByWithRelationInput | HallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Halls.
     */
    cursor?: HallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Halls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Halls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Halls.
     */
    distinct?: HallScalarFieldEnum | HallScalarFieldEnum[]
  }

  /**
   * Hall findFirstOrThrow
   */
  export type HallFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter, which Hall to fetch.
     */
    where?: HallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Halls to fetch.
     */
    orderBy?: HallOrderByWithRelationInput | HallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Halls.
     */
    cursor?: HallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Halls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Halls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Halls.
     */
    distinct?: HallScalarFieldEnum | HallScalarFieldEnum[]
  }

  /**
   * Hall findMany
   */
  export type HallFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter, which Halls to fetch.
     */
    where?: HallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Halls to fetch.
     */
    orderBy?: HallOrderByWithRelationInput | HallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Halls.
     */
    cursor?: HallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Halls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Halls.
     */
    skip?: number
    distinct?: HallScalarFieldEnum | HallScalarFieldEnum[]
  }

  /**
   * Hall create
   */
  export type HallCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * The data needed to create a Hall.
     */
    data: XOR<HallCreateInput, HallUncheckedCreateInput>
  }

  /**
   * Hall createMany
   */
  export type HallCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Halls.
     */
    data: HallCreateManyInput | HallCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hall createManyAndReturn
   */
  export type HallCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * The data used to create many Halls.
     */
    data: HallCreateManyInput | HallCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hall update
   */
  export type HallUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * The data needed to update a Hall.
     */
    data: XOR<HallUpdateInput, HallUncheckedUpdateInput>
    /**
     * Choose, which Hall to update.
     */
    where: HallWhereUniqueInput
  }

  /**
   * Hall updateMany
   */
  export type HallUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Halls.
     */
    data: XOR<HallUpdateManyMutationInput, HallUncheckedUpdateManyInput>
    /**
     * Filter which Halls to update
     */
    where?: HallWhereInput
    /**
     * Limit how many Halls to update.
     */
    limit?: number
  }

  /**
   * Hall updateManyAndReturn
   */
  export type HallUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * The data used to update Halls.
     */
    data: XOR<HallUpdateManyMutationInput, HallUncheckedUpdateManyInput>
    /**
     * Filter which Halls to update
     */
    where?: HallWhereInput
    /**
     * Limit how many Halls to update.
     */
    limit?: number
  }

  /**
   * Hall upsert
   */
  export type HallUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * The filter to search for the Hall to update in case it exists.
     */
    where: HallWhereUniqueInput
    /**
     * In case the Hall found by the `where` argument doesn't exist, create a new Hall with this data.
     */
    create: XOR<HallCreateInput, HallUncheckedCreateInput>
    /**
     * In case the Hall was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HallUpdateInput, HallUncheckedUpdateInput>
  }

  /**
   * Hall delete
   */
  export type HallDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
    /**
     * Filter which Hall to delete.
     */
    where: HallWhereUniqueInput
  }

  /**
   * Hall deleteMany
   */
  export type HallDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Halls to delete
     */
    where?: HallWhereInput
    /**
     * Limit how many Halls to delete.
     */
    limit?: number
  }

  /**
   * Hall.screenings
   */
  export type Hall$screeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    where?: ScreeningWhereInput
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    cursor?: ScreeningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Hall without action
   */
  export type HallDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hall
     */
    select?: HallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hall
     */
    omit?: HallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HallInclude<ExtArgs> | null
  }


  /**
   * Model Screening
   */

  export type AggregateScreening = {
    _count: ScreeningCountAggregateOutputType | null
    _min: ScreeningMinAggregateOutputType | null
    _max: ScreeningMaxAggregateOutputType | null
  }

  export type ScreeningMinAggregateOutputType = {
    id: string | null
    movieId: string | null
    startTime: Date | null
    endTime: Date | null
    deletedAt: Date | null
    hallId: string | null
  }

  export type ScreeningMaxAggregateOutputType = {
    id: string | null
    movieId: string | null
    startTime: Date | null
    endTime: Date | null
    deletedAt: Date | null
    hallId: string | null
  }

  export type ScreeningCountAggregateOutputType = {
    id: number
    movieId: number
    startTime: number
    endTime: number
    deletedAt: number
    hallId: number
    _all: number
  }


  export type ScreeningMinAggregateInputType = {
    id?: true
    movieId?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    hallId?: true
  }

  export type ScreeningMaxAggregateInputType = {
    id?: true
    movieId?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    hallId?: true
  }

  export type ScreeningCountAggregateInputType = {
    id?: true
    movieId?: true
    startTime?: true
    endTime?: true
    deletedAt?: true
    hallId?: true
    _all?: true
  }

  export type ScreeningAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screening to aggregate.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Screenings
    **/
    _count?: true | ScreeningCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScreeningMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScreeningMaxAggregateInputType
  }

  export type GetScreeningAggregateType<T extends ScreeningAggregateArgs> = {
        [P in keyof T & keyof AggregateScreening]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScreening[P]>
      : GetScalarType<T[P], AggregateScreening[P]>
  }




  export type ScreeningGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningWhereInput
    orderBy?: ScreeningOrderByWithAggregationInput | ScreeningOrderByWithAggregationInput[]
    by: ScreeningScalarFieldEnum[] | ScreeningScalarFieldEnum
    having?: ScreeningScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScreeningCountAggregateInputType | true
    _min?: ScreeningMinAggregateInputType
    _max?: ScreeningMaxAggregateInputType
  }

  export type ScreeningGroupByOutputType = {
    id: string
    movieId: string
    startTime: Date
    endTime: Date
    deletedAt: Date | null
    hallId: string
    _count: ScreeningCountAggregateOutputType | null
    _min: ScreeningMinAggregateOutputType | null
    _max: ScreeningMaxAggregateOutputType | null
  }

  type GetScreeningGroupByPayload<T extends ScreeningGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScreeningGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScreeningGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScreeningGroupByOutputType[P]>
            : GetScalarType<T[P], ScreeningGroupByOutputType[P]>
        }
      >
    >


  export type ScreeningSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    hallId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    hallId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    hallId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectScalar = {
    id?: boolean
    movieId?: boolean
    startTime?: boolean
    endTime?: boolean
    deletedAt?: boolean
    hallId?: boolean
  }

  export type ScreeningOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "movieId" | "startTime" | "endTime" | "deletedAt" | "hallId", ExtArgs["result"]["screening"]>
  export type ScreeningInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }
  export type ScreeningIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }
  export type ScreeningIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    hall?: boolean | HallDefaultArgs<ExtArgs>
  }

  export type $ScreeningPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Screening"
    objects: {
      movie: Prisma.$MoviePayload<ExtArgs>
      hall: Prisma.$HallPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      movieId: string
      startTime: Date
      endTime: Date
      deletedAt: Date | null
      hallId: string
    }, ExtArgs["result"]["screening"]>
    composites: {}
  }

  type ScreeningGetPayload<S extends boolean | null | undefined | ScreeningDefaultArgs> = $Result.GetResult<Prisma.$ScreeningPayload, S>

  type ScreeningCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScreeningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScreeningCountAggregateInputType | true
    }

  export interface ScreeningDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Screening'], meta: { name: 'Screening' } }
    /**
     * Find zero or one Screening that matches the filter.
     * @param {ScreeningFindUniqueArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreeningFindUniqueArgs>(args: SelectSubset<T, ScreeningFindUniqueArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Screening that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScreeningFindUniqueOrThrowArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreeningFindUniqueOrThrowArgs>(args: SelectSubset<T, ScreeningFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Screening that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindFirstArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreeningFindFirstArgs>(args?: SelectSubset<T, ScreeningFindFirstArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Screening that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindFirstOrThrowArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreeningFindFirstOrThrowArgs>(args?: SelectSubset<T, ScreeningFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Screenings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Screenings
     * const screenings = await prisma.screening.findMany()
     * 
     * // Get first 10 Screenings
     * const screenings = await prisma.screening.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const screeningWithIdOnly = await prisma.screening.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScreeningFindManyArgs>(args?: SelectSubset<T, ScreeningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Screening.
     * @param {ScreeningCreateArgs} args - Arguments to create a Screening.
     * @example
     * // Create one Screening
     * const Screening = await prisma.screening.create({
     *   data: {
     *     // ... data to create a Screening
     *   }
     * })
     * 
     */
    create<T extends ScreeningCreateArgs>(args: SelectSubset<T, ScreeningCreateArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Screenings.
     * @param {ScreeningCreateManyArgs} args - Arguments to create many Screenings.
     * @example
     * // Create many Screenings
     * const screening = await prisma.screening.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScreeningCreateManyArgs>(args?: SelectSubset<T, ScreeningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Screenings and returns the data saved in the database.
     * @param {ScreeningCreateManyAndReturnArgs} args - Arguments to create many Screenings.
     * @example
     * // Create many Screenings
     * const screening = await prisma.screening.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Screenings and only return the `id`
     * const screeningWithIdOnly = await prisma.screening.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScreeningCreateManyAndReturnArgs>(args?: SelectSubset<T, ScreeningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Screening.
     * @param {ScreeningDeleteArgs} args - Arguments to delete one Screening.
     * @example
     * // Delete one Screening
     * const Screening = await prisma.screening.delete({
     *   where: {
     *     // ... filter to delete one Screening
     *   }
     * })
     * 
     */
    delete<T extends ScreeningDeleteArgs>(args: SelectSubset<T, ScreeningDeleteArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Screening.
     * @param {ScreeningUpdateArgs} args - Arguments to update one Screening.
     * @example
     * // Update one Screening
     * const screening = await prisma.screening.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScreeningUpdateArgs>(args: SelectSubset<T, ScreeningUpdateArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Screenings.
     * @param {ScreeningDeleteManyArgs} args - Arguments to filter Screenings to delete.
     * @example
     * // Delete a few Screenings
     * const { count } = await prisma.screening.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScreeningDeleteManyArgs>(args?: SelectSubset<T, ScreeningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Screenings
     * const screening = await prisma.screening.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScreeningUpdateManyArgs>(args: SelectSubset<T, ScreeningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenings and returns the data updated in the database.
     * @param {ScreeningUpdateManyAndReturnArgs} args - Arguments to update many Screenings.
     * @example
     * // Update many Screenings
     * const screening = await prisma.screening.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Screenings and only return the `id`
     * const screeningWithIdOnly = await prisma.screening.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScreeningUpdateManyAndReturnArgs>(args: SelectSubset<T, ScreeningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Screening.
     * @param {ScreeningUpsertArgs} args - Arguments to update or create a Screening.
     * @example
     * // Update or create a Screening
     * const screening = await prisma.screening.upsert({
     *   create: {
     *     // ... data to create a Screening
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Screening we want to update
     *   }
     * })
     */
    upsert<T extends ScreeningUpsertArgs>(args: SelectSubset<T, ScreeningUpsertArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Screenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningCountArgs} args - Arguments to filter Screenings to count.
     * @example
     * // Count the number of Screenings
     * const count = await prisma.screening.count({
     *   where: {
     *     // ... the filter for the Screenings we want to count
     *   }
     * })
    **/
    count<T extends ScreeningCountArgs>(
      args?: Subset<T, ScreeningCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScreeningCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Screening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScreeningAggregateArgs>(args: Subset<T, ScreeningAggregateArgs>): Prisma.PrismaPromise<GetScreeningAggregateType<T>>

    /**
     * Group by Screening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScreeningGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScreeningGroupByArgs['orderBy'] }
        : { orderBy?: ScreeningGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScreeningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreeningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Screening model
   */
  readonly fields: ScreeningFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Screening.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScreeningClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hall<T extends HallDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HallDefaultArgs<ExtArgs>>): Prisma__HallClient<$Result.GetResult<Prisma.$HallPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Screening model
   */
  interface ScreeningFieldRefs {
    readonly id: FieldRef<"Screening", 'String'>
    readonly movieId: FieldRef<"Screening", 'String'>
    readonly startTime: FieldRef<"Screening", 'DateTime'>
    readonly endTime: FieldRef<"Screening", 'DateTime'>
    readonly deletedAt: FieldRef<"Screening", 'DateTime'>
    readonly hallId: FieldRef<"Screening", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Screening findUnique
   */
  export type ScreeningFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening findUniqueOrThrow
   */
  export type ScreeningFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening findFirst
   */
  export type ScreeningFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenings.
     */
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening findFirstOrThrow
   */
  export type ScreeningFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenings.
     */
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening findMany
   */
  export type ScreeningFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screenings to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening create
   */
  export type ScreeningCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The data needed to create a Screening.
     */
    data: XOR<ScreeningCreateInput, ScreeningUncheckedCreateInput>
  }

  /**
   * Screening createMany
   */
  export type ScreeningCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Screenings.
     */
    data: ScreeningCreateManyInput | ScreeningCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Screening createManyAndReturn
   */
  export type ScreeningCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * The data used to create many Screenings.
     */
    data: ScreeningCreateManyInput | ScreeningCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screening update
   */
  export type ScreeningUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The data needed to update a Screening.
     */
    data: XOR<ScreeningUpdateInput, ScreeningUncheckedUpdateInput>
    /**
     * Choose, which Screening to update.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening updateMany
   */
  export type ScreeningUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Screenings.
     */
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyInput>
    /**
     * Filter which Screenings to update
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to update.
     */
    limit?: number
  }

  /**
   * Screening updateManyAndReturn
   */
  export type ScreeningUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * The data used to update Screenings.
     */
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyInput>
    /**
     * Filter which Screenings to update
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screening upsert
   */
  export type ScreeningUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The filter to search for the Screening to update in case it exists.
     */
    where: ScreeningWhereUniqueInput
    /**
     * In case the Screening found by the `where` argument doesn't exist, create a new Screening with this data.
     */
    create: XOR<ScreeningCreateInput, ScreeningUncheckedCreateInput>
    /**
     * In case the Screening was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScreeningUpdateInput, ScreeningUncheckedUpdateInput>
  }

  /**
   * Screening delete
   */
  export type ScreeningDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter which Screening to delete.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening deleteMany
   */
  export type ScreeningDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenings to delete
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to delete.
     */
    limit?: number
  }

  /**
   * Screening without action
   */
  export type ScreeningDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    username: 'username',
    password: 'password',
    role: 'role',
    verified: 'verified',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MovieScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    name: 'name',
    duration: 'duration',
    deletedAt: 'deletedAt'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const HallScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    screenType: 'screenType',
    seats: 'seats',
    deletedAt: 'deletedAt'
  };

  export type HallScalarFieldEnum = (typeof HallScalarFieldEnum)[keyof typeof HallScalarFieldEnum]


  export const ScreeningScalarFieldEnum: {
    id: 'id',
    movieId: 'movieId',
    startTime: 'startTime',
    endTime: 'endTime',
    deletedAt: 'deletedAt',
    hallId: 'hallId'
  };

  export type ScreeningScalarFieldEnum = (typeof ScreeningScalarFieldEnum)[keyof typeof ScreeningScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'HallType'
   */
  export type EnumHallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HallType'>
    


  /**
   * Reference to a field of type 'HallType[]'
   */
  export type ListEnumHallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HallType[]'>
    


  /**
   * Reference to a field of type 'ScreenType'
   */
  export type EnumScreenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreenType'>
    


  /**
   * Reference to a field of type 'ScreenType[]'
   */
  export type ListEnumScreenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreenType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    verified?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    verified?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    verified?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    verified?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type MovieWhereInput = {
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    id?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    name?: StringFilter<"Movie"> | string
    duration?: IntFilter<"Movie"> | number
    deletedAt?: DateTimeNullableFilter<"Movie"> | Date | string | null
    screenings?: ScreeningListRelationFilter
  }

  export type MovieOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    screenings?: ScreeningOrderByRelationAggregateInput
  }

  export type MovieWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    duration?: IntFilter<"Movie"> | number
    deletedAt?: DateTimeNullableFilter<"Movie"> | Date | string | null
    screenings?: ScreeningListRelationFilter
  }, "id" | "name">

  export type MovieOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MovieCountOrderByAggregateInput
    _avg?: MovieAvgOrderByAggregateInput
    _max?: MovieMaxOrderByAggregateInput
    _min?: MovieMinOrderByAggregateInput
    _sum?: MovieSumOrderByAggregateInput
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    OR?: MovieScalarWhereWithAggregatesInput[]
    NOT?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Movie"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Movie"> | Date | string
    name?: StringWithAggregatesFilter<"Movie"> | string
    duration?: IntWithAggregatesFilter<"Movie"> | number
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Movie"> | Date | string | null
  }

  export type HallWhereInput = {
    AND?: HallWhereInput | HallWhereInput[]
    OR?: HallWhereInput[]
    NOT?: HallWhereInput | HallWhereInput[]
    id?: StringFilter<"Hall"> | string
    name?: StringFilter<"Hall"> | string
    type?: EnumHallTypeFilter<"Hall"> | $Enums.HallType
    screenType?: EnumScreenTypeFilter<"Hall"> | $Enums.ScreenType
    seats?: IntFilter<"Hall"> | number
    deletedAt?: DateTimeNullableFilter<"Hall"> | Date | string | null
    screenings?: ScreeningListRelationFilter
  }

  export type HallOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    screenType?: SortOrder
    seats?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    screenings?: ScreeningOrderByRelationAggregateInput
  }

  export type HallWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: HallWhereInput | HallWhereInput[]
    OR?: HallWhereInput[]
    NOT?: HallWhereInput | HallWhereInput[]
    type?: EnumHallTypeFilter<"Hall"> | $Enums.HallType
    screenType?: EnumScreenTypeFilter<"Hall"> | $Enums.ScreenType
    seats?: IntFilter<"Hall"> | number
    deletedAt?: DateTimeNullableFilter<"Hall"> | Date | string | null
    screenings?: ScreeningListRelationFilter
  }, "id" | "name">

  export type HallOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    screenType?: SortOrder
    seats?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: HallCountOrderByAggregateInput
    _avg?: HallAvgOrderByAggregateInput
    _max?: HallMaxOrderByAggregateInput
    _min?: HallMinOrderByAggregateInput
    _sum?: HallSumOrderByAggregateInput
  }

  export type HallScalarWhereWithAggregatesInput = {
    AND?: HallScalarWhereWithAggregatesInput | HallScalarWhereWithAggregatesInput[]
    OR?: HallScalarWhereWithAggregatesInput[]
    NOT?: HallScalarWhereWithAggregatesInput | HallScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hall"> | string
    name?: StringWithAggregatesFilter<"Hall"> | string
    type?: EnumHallTypeWithAggregatesFilter<"Hall"> | $Enums.HallType
    screenType?: EnumScreenTypeWithAggregatesFilter<"Hall"> | $Enums.ScreenType
    seats?: IntWithAggregatesFilter<"Hall"> | number
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Hall"> | Date | string | null
  }

  export type ScreeningWhereInput = {
    AND?: ScreeningWhereInput | ScreeningWhereInput[]
    OR?: ScreeningWhereInput[]
    NOT?: ScreeningWhereInput | ScreeningWhereInput[]
    id?: StringFilter<"Screening"> | string
    movieId?: StringFilter<"Screening"> | string
    startTime?: DateTimeFilter<"Screening"> | Date | string
    endTime?: DateTimeFilter<"Screening"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screening"> | Date | string | null
    hallId?: StringFilter<"Screening"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    hall?: XOR<HallScalarRelationFilter, HallWhereInput>
  }

  export type ScreeningOrderByWithRelationInput = {
    id?: SortOrder
    movieId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    hallId?: SortOrder
    movie?: MovieOrderByWithRelationInput
    hall?: HallOrderByWithRelationInput
  }

  export type ScreeningWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScreeningWhereInput | ScreeningWhereInput[]
    OR?: ScreeningWhereInput[]
    NOT?: ScreeningWhereInput | ScreeningWhereInput[]
    movieId?: StringFilter<"Screening"> | string
    startTime?: DateTimeFilter<"Screening"> | Date | string
    endTime?: DateTimeFilter<"Screening"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screening"> | Date | string | null
    hallId?: StringFilter<"Screening"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    hall?: XOR<HallScalarRelationFilter, HallWhereInput>
  }, "id">

  export type ScreeningOrderByWithAggregationInput = {
    id?: SortOrder
    movieId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    hallId?: SortOrder
    _count?: ScreeningCountOrderByAggregateInput
    _max?: ScreeningMaxOrderByAggregateInput
    _min?: ScreeningMinOrderByAggregateInput
  }

  export type ScreeningScalarWhereWithAggregatesInput = {
    AND?: ScreeningScalarWhereWithAggregatesInput | ScreeningScalarWhereWithAggregatesInput[]
    OR?: ScreeningScalarWhereWithAggregatesInput[]
    NOT?: ScreeningScalarWhereWithAggregatesInput | ScreeningScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Screening"> | string
    movieId?: StringWithAggregatesFilter<"Screening"> | string
    startTime?: DateTimeWithAggregatesFilter<"Screening"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Screening"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Screening"> | Date | string | null
    hallId?: StringWithAggregatesFilter<"Screening"> | string
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    verified?: boolean
    deletedAt?: Date | string | null
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    verified?: boolean
    deletedAt?: Date | string | null
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    verified?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    verified?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    verified?: boolean
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    verified?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    verified?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MovieCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    duration: number
    deletedAt?: Date | string | null
    screenings?: ScreeningCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    duration: number
    deletedAt?: Date | string | null
    screenings?: ScreeningUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    screenings?: ScreeningUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    screenings?: ScreeningUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type MovieCreateManyInput = {
    id?: string
    createdAt?: Date | string
    name: string
    duration: number
    deletedAt?: Date | string | null
  }

  export type MovieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MovieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HallCreateInput = {
    id?: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt?: Date | string | null
    screenings?: ScreeningCreateNestedManyWithoutHallInput
  }

  export type HallUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt?: Date | string | null
    screenings?: ScreeningUncheckedCreateNestedManyWithoutHallInput
  }

  export type HallUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    screenings?: ScreeningUpdateManyWithoutHallNestedInput
  }

  export type HallUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    screenings?: ScreeningUncheckedUpdateManyWithoutHallNestedInput
  }

  export type HallCreateManyInput = {
    id?: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt?: Date | string | null
  }

  export type HallUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HallUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreeningCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    movie: MovieCreateNestedOneWithoutScreeningsInput
    hall: HallCreateNestedOneWithoutScreeningsInput
  }

  export type ScreeningUncheckedCreateInput = {
    id?: string
    movieId: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    hallId: string
  }

  export type ScreeningUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movie?: MovieUpdateOneRequiredWithoutScreeningsNestedInput
    hall?: HallUpdateOneRequiredWithoutScreeningsNestedInput
  }

  export type ScreeningUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hallId?: StringFieldUpdateOperationsInput | string
  }

  export type ScreeningCreateManyInput = {
    id?: string
    movieId: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    hallId: string
  }

  export type ScreeningUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreeningUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hallId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    verified?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    verified?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    verified?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ScreeningListRelationFilter = {
    every?: ScreeningWhereInput
    some?: ScreeningWhereInput
    none?: ScreeningWhereInput
  }

  export type ScreeningOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MovieCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    deletedAt?: SortOrder
  }

  export type MovieAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type MovieMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    deletedAt?: SortOrder
  }

  export type MovieMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    deletedAt?: SortOrder
  }

  export type MovieSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumHallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HallType | EnumHallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHallTypeFilter<$PrismaModel> | $Enums.HallType
  }

  export type EnumScreenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreenType | EnumScreenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumScreenTypeFilter<$PrismaModel> | $Enums.ScreenType
  }

  export type HallCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    screenType?: SortOrder
    seats?: SortOrder
    deletedAt?: SortOrder
  }

  export type HallAvgOrderByAggregateInput = {
    seats?: SortOrder
  }

  export type HallMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    screenType?: SortOrder
    seats?: SortOrder
    deletedAt?: SortOrder
  }

  export type HallMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    screenType?: SortOrder
    seats?: SortOrder
    deletedAt?: SortOrder
  }

  export type HallSumOrderByAggregateInput = {
    seats?: SortOrder
  }

  export type EnumHallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HallType | EnumHallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHallTypeWithAggregatesFilter<$PrismaModel> | $Enums.HallType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHallTypeFilter<$PrismaModel>
    _max?: NestedEnumHallTypeFilter<$PrismaModel>
  }

  export type EnumScreenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreenType | EnumScreenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumScreenTypeWithAggregatesFilter<$PrismaModel> | $Enums.ScreenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreenTypeFilter<$PrismaModel>
    _max?: NestedEnumScreenTypeFilter<$PrismaModel>
  }

  export type MovieScalarRelationFilter = {
    is?: MovieWhereInput
    isNot?: MovieWhereInput
  }

  export type HallScalarRelationFilter = {
    is?: HallWhereInput
    isNot?: HallWhereInput
  }

  export type ScreeningCountOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    hallId?: SortOrder
  }

  export type ScreeningMaxOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    hallId?: SortOrder
  }

  export type ScreeningMinOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    deletedAt?: SortOrder
    hallId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ScreeningCreateNestedManyWithoutMovieInput = {
    create?: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput> | ScreeningCreateWithoutMovieInput[] | ScreeningUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutMovieInput | ScreeningCreateOrConnectWithoutMovieInput[]
    createMany?: ScreeningCreateManyMovieInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type ScreeningUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput> | ScreeningCreateWithoutMovieInput[] | ScreeningUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutMovieInput | ScreeningCreateOrConnectWithoutMovieInput[]
    createMany?: ScreeningCreateManyMovieInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ScreeningUpdateManyWithoutMovieNestedInput = {
    create?: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput> | ScreeningCreateWithoutMovieInput[] | ScreeningUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutMovieInput | ScreeningCreateOrConnectWithoutMovieInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutMovieInput | ScreeningUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: ScreeningCreateManyMovieInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutMovieInput | ScreeningUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutMovieInput | ScreeningUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type ScreeningUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput> | ScreeningCreateWithoutMovieInput[] | ScreeningUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutMovieInput | ScreeningCreateOrConnectWithoutMovieInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutMovieInput | ScreeningUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: ScreeningCreateManyMovieInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutMovieInput | ScreeningUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutMovieInput | ScreeningUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type ScreeningCreateNestedManyWithoutHallInput = {
    create?: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput> | ScreeningCreateWithoutHallInput[] | ScreeningUncheckedCreateWithoutHallInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutHallInput | ScreeningCreateOrConnectWithoutHallInput[]
    createMany?: ScreeningCreateManyHallInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type ScreeningUncheckedCreateNestedManyWithoutHallInput = {
    create?: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput> | ScreeningCreateWithoutHallInput[] | ScreeningUncheckedCreateWithoutHallInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutHallInput | ScreeningCreateOrConnectWithoutHallInput[]
    createMany?: ScreeningCreateManyHallInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type EnumHallTypeFieldUpdateOperationsInput = {
    set?: $Enums.HallType
  }

  export type EnumScreenTypeFieldUpdateOperationsInput = {
    set?: $Enums.ScreenType
  }

  export type ScreeningUpdateManyWithoutHallNestedInput = {
    create?: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput> | ScreeningCreateWithoutHallInput[] | ScreeningUncheckedCreateWithoutHallInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutHallInput | ScreeningCreateOrConnectWithoutHallInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutHallInput | ScreeningUpsertWithWhereUniqueWithoutHallInput[]
    createMany?: ScreeningCreateManyHallInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutHallInput | ScreeningUpdateWithWhereUniqueWithoutHallInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutHallInput | ScreeningUpdateManyWithWhereWithoutHallInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type ScreeningUncheckedUpdateManyWithoutHallNestedInput = {
    create?: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput> | ScreeningCreateWithoutHallInput[] | ScreeningUncheckedCreateWithoutHallInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutHallInput | ScreeningCreateOrConnectWithoutHallInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutHallInput | ScreeningUpsertWithWhereUniqueWithoutHallInput[]
    createMany?: ScreeningCreateManyHallInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutHallInput | ScreeningUpdateWithWhereUniqueWithoutHallInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutHallInput | ScreeningUpdateManyWithWhereWithoutHallInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type MovieCreateNestedOneWithoutScreeningsInput = {
    create?: XOR<MovieCreateWithoutScreeningsInput, MovieUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutScreeningsInput
    connect?: MovieWhereUniqueInput
  }

  export type HallCreateNestedOneWithoutScreeningsInput = {
    create?: XOR<HallCreateWithoutScreeningsInput, HallUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: HallCreateOrConnectWithoutScreeningsInput
    connect?: HallWhereUniqueInput
  }

  export type MovieUpdateOneRequiredWithoutScreeningsNestedInput = {
    create?: XOR<MovieCreateWithoutScreeningsInput, MovieUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutScreeningsInput
    upsert?: MovieUpsertWithoutScreeningsInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutScreeningsInput, MovieUpdateWithoutScreeningsInput>, MovieUncheckedUpdateWithoutScreeningsInput>
  }

  export type HallUpdateOneRequiredWithoutScreeningsNestedInput = {
    create?: XOR<HallCreateWithoutScreeningsInput, HallUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: HallCreateOrConnectWithoutScreeningsInput
    upsert?: HallUpsertWithoutScreeningsInput
    connect?: HallWhereUniqueInput
    update?: XOR<XOR<HallUpdateToOneWithWhereWithoutScreeningsInput, HallUpdateWithoutScreeningsInput>, HallUncheckedUpdateWithoutScreeningsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumHallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HallType | EnumHallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHallTypeFilter<$PrismaModel> | $Enums.HallType
  }

  export type NestedEnumScreenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreenType | EnumScreenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumScreenTypeFilter<$PrismaModel> | $Enums.ScreenType
  }

  export type NestedEnumHallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HallType | EnumHallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HallType[] | ListEnumHallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHallTypeWithAggregatesFilter<$PrismaModel> | $Enums.HallType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHallTypeFilter<$PrismaModel>
    _max?: NestedEnumHallTypeFilter<$PrismaModel>
  }

  export type NestedEnumScreenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreenType | EnumScreenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreenType[] | ListEnumScreenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumScreenTypeWithAggregatesFilter<$PrismaModel> | $Enums.ScreenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreenTypeFilter<$PrismaModel>
    _max?: NestedEnumScreenTypeFilter<$PrismaModel>
  }

  export type ScreeningCreateWithoutMovieInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    hall: HallCreateNestedOneWithoutScreeningsInput
  }

  export type ScreeningUncheckedCreateWithoutMovieInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    hallId: string
  }

  export type ScreeningCreateOrConnectWithoutMovieInput = {
    where: ScreeningWhereUniqueInput
    create: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput>
  }

  export type ScreeningCreateManyMovieInputEnvelope = {
    data: ScreeningCreateManyMovieInput | ScreeningCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type ScreeningUpsertWithWhereUniqueWithoutMovieInput = {
    where: ScreeningWhereUniqueInput
    update: XOR<ScreeningUpdateWithoutMovieInput, ScreeningUncheckedUpdateWithoutMovieInput>
    create: XOR<ScreeningCreateWithoutMovieInput, ScreeningUncheckedCreateWithoutMovieInput>
  }

  export type ScreeningUpdateWithWhereUniqueWithoutMovieInput = {
    where: ScreeningWhereUniqueInput
    data: XOR<ScreeningUpdateWithoutMovieInput, ScreeningUncheckedUpdateWithoutMovieInput>
  }

  export type ScreeningUpdateManyWithWhereWithoutMovieInput = {
    where: ScreeningScalarWhereInput
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyWithoutMovieInput>
  }

  export type ScreeningScalarWhereInput = {
    AND?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
    OR?: ScreeningScalarWhereInput[]
    NOT?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
    id?: StringFilter<"Screening"> | string
    movieId?: StringFilter<"Screening"> | string
    startTime?: DateTimeFilter<"Screening"> | Date | string
    endTime?: DateTimeFilter<"Screening"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Screening"> | Date | string | null
    hallId?: StringFilter<"Screening"> | string
  }

  export type ScreeningCreateWithoutHallInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    movie: MovieCreateNestedOneWithoutScreeningsInput
  }

  export type ScreeningUncheckedCreateWithoutHallInput = {
    id?: string
    movieId: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreeningCreateOrConnectWithoutHallInput = {
    where: ScreeningWhereUniqueInput
    create: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput>
  }

  export type ScreeningCreateManyHallInputEnvelope = {
    data: ScreeningCreateManyHallInput | ScreeningCreateManyHallInput[]
    skipDuplicates?: boolean
  }

  export type ScreeningUpsertWithWhereUniqueWithoutHallInput = {
    where: ScreeningWhereUniqueInput
    update: XOR<ScreeningUpdateWithoutHallInput, ScreeningUncheckedUpdateWithoutHallInput>
    create: XOR<ScreeningCreateWithoutHallInput, ScreeningUncheckedCreateWithoutHallInput>
  }

  export type ScreeningUpdateWithWhereUniqueWithoutHallInput = {
    where: ScreeningWhereUniqueInput
    data: XOR<ScreeningUpdateWithoutHallInput, ScreeningUncheckedUpdateWithoutHallInput>
  }

  export type ScreeningUpdateManyWithWhereWithoutHallInput = {
    where: ScreeningScalarWhereInput
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyWithoutHallInput>
  }

  export type MovieCreateWithoutScreeningsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    duration: number
    deletedAt?: Date | string | null
  }

  export type MovieUncheckedCreateWithoutScreeningsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    duration: number
    deletedAt?: Date | string | null
  }

  export type MovieCreateOrConnectWithoutScreeningsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutScreeningsInput, MovieUncheckedCreateWithoutScreeningsInput>
  }

  export type HallCreateWithoutScreeningsInput = {
    id?: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt?: Date | string | null
  }

  export type HallUncheckedCreateWithoutScreeningsInput = {
    id?: string
    name: string
    type: $Enums.HallType
    screenType: $Enums.ScreenType
    seats: number
    deletedAt?: Date | string | null
  }

  export type HallCreateOrConnectWithoutScreeningsInput = {
    where: HallWhereUniqueInput
    create: XOR<HallCreateWithoutScreeningsInput, HallUncheckedCreateWithoutScreeningsInput>
  }

  export type MovieUpsertWithoutScreeningsInput = {
    update: XOR<MovieUpdateWithoutScreeningsInput, MovieUncheckedUpdateWithoutScreeningsInput>
    create: XOR<MovieCreateWithoutScreeningsInput, MovieUncheckedCreateWithoutScreeningsInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutScreeningsInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutScreeningsInput, MovieUncheckedUpdateWithoutScreeningsInput>
  }

  export type MovieUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MovieUncheckedUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HallUpsertWithoutScreeningsInput = {
    update: XOR<HallUpdateWithoutScreeningsInput, HallUncheckedUpdateWithoutScreeningsInput>
    create: XOR<HallCreateWithoutScreeningsInput, HallUncheckedCreateWithoutScreeningsInput>
    where?: HallWhereInput
  }

  export type HallUpdateToOneWithWhereWithoutScreeningsInput = {
    where?: HallWhereInput
    data: XOR<HallUpdateWithoutScreeningsInput, HallUncheckedUpdateWithoutScreeningsInput>
  }

  export type HallUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HallUncheckedUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumHallTypeFieldUpdateOperationsInput | $Enums.HallType
    screenType?: EnumScreenTypeFieldUpdateOperationsInput | $Enums.ScreenType
    seats?: IntFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreeningCreateManyMovieInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
    hallId: string
  }

  export type ScreeningUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hall?: HallUpdateOneRequiredWithoutScreeningsNestedInput
  }

  export type ScreeningUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hallId?: StringFieldUpdateOperationsInput | string
  }

  export type ScreeningUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hallId?: StringFieldUpdateOperationsInput | string
  }

  export type ScreeningCreateManyHallInput = {
    id?: string
    movieId: string
    startTime: Date | string
    endTime: Date | string
    deletedAt?: Date | string | null
  }

  export type ScreeningUpdateWithoutHallInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movie?: MovieUpdateOneRequiredWithoutScreeningsNestedInput
  }

  export type ScreeningUncheckedUpdateWithoutHallInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ScreeningUncheckedUpdateManyWithoutHallInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}